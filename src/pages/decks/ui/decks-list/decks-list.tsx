import type { ChangeEvent } from 'react'

import type { Sort } from '@/shared/ui/table/table-sort-header'

import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useGetDecksQuery } from '@/entities/decks/api'
import { useMeQuery } from '@/entities/user/api'
import { CreateDeck, DeleteDeckButton } from '@/features/decks/ui'
import { formatDate } from '@/shared/lib'
import {
   Button,
   CirclePlayIcon,
   InputSearch,
   PencilIcon,
   Table,
   TableBody,
   TableCell,
   TableRow,
   Tabs,
   TrashIcon,
   Typography,
   Slider,
   Pagination,
   TableSortHeader,
} from '@/shared/ui'
import { DefaultCover } from '@/shared/ui/images'

import styles from './decks-list.module.scss'

import { DECK_COLUMNS } from '../../model'

export const DecksList = () => {
   const minCardsCount = 0
   const maxCardsCount = 100

   const [searchParams, setSearchParams] = useSearchParams({
      page: '1',
      name: '',
      perPage: '10',
      show: 'all',
      min: minCardsCount.toString(),
      max: maxCardsCount.toString(),
   })

   const page = Number(searchParams.get('page'))
   const setPage = (page: number) => {
      searchParams.set('page', page.toString())
      searchParams.set('name', '')
      setSearchParams(searchParams)
   }

   const name = searchParams.get('name')
   const setName = (name: string) => {
      searchParams.set('name', name)
      searchParams.set('page', '1')
      setSearchParams(searchParams)
   }

   const perPage = Number(searchParams.get('perPage'))
   const setPerPage = (perPage: number) => {
      searchParams.set('perPage', perPage.toString())
      setSearchParams(searchParams)
   }

   const show = searchParams.get('show')
   const setShow = (show: string) => {
      searchParams.set('show', show)
      setSearchParams(searchParams)
   }

   const min = Number(searchParams.get('min'))
   const max = Number(searchParams.get('max'))

   const setRange = (range: number[]) => {
      searchParams.set('min', range[0].toString())
      searchParams.set('max', range[1].toString())
      setSearchParams(searchParams)
   }

   const [sort, setSort] = useState<Sort>(null)

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
   }

   const handleClearFilter = () => {
      searchParams.set('name', '')
      setRange([minCardsCount, maxCardsCount])
      setShow('all')
   }

   const handleTabChange = (value: string) => {
      setShow(value)
      setPage(1)
   }

   const { data: userData } = useMeQuery()

   const authorId = show === 'my' ? userData?.id : ''

   const orderBy = useMemo(() => {
      if (!sort) {
         return null
      }

      return `${sort.key}-${sort.direction}`
   }, [sort])

   const { data } = useGetDecksQuery({
      currentPage: page,
      itemsPerPage: perPage,
      name: name ?? undefined,
      maxCardsCount: max,
      minCardsCount: min,
      authorId,
      orderBy,
   })

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <Typography textAlign={'left'} variant={'h1'}>
               Decks List
            </Typography>
            <CreateDeck />
         </div>
         <div className={styles.filters}>
            <InputSearch
               className={styles.input}
               placeholder={'...'}
               value={name ?? undefined}
               onChange={handleSearch}
               onClear={() => setName('')}
            />
            <Tabs onValueChange={handleTabChange} value={show ?? undefined}>
               <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
                  Show decks cards
               </Typography>
               <Tabs.List className={styles.tabs}>
                  <Tabs.Trigger value={'my'}>My Cards</Tabs.Trigger>
                  <Tabs.Trigger value={'all'}>All Cards</Tabs.Trigger>
               </Tabs.List>
            </Tabs>
            <div>
               <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
                  Number of cards
               </Typography>
               <Slider
                  values={[min, max]}
                  min={minCardsCount}
                  max={maxCardsCount}
                  onValueCommit={setRange}
               />
            </div>
            <Button onClick={handleClearFilter} className={styles.clear} variant={'secondary'}>
               <TrashIcon width={16} height={16} />
               Clear Filter
            </Button>
         </div>
         <div className={styles.decks}>
            <Table>
               <TableSortHeader columns={DECK_COLUMNS} sort={sort} onSort={setSort} />
               <TableBody>
                  {data?.items.map(item => {
                     const coverUrl = item.cover ?? DefaultCover
                     const isOwner = userData?.id === item.userId

                     return (
                        <TableRow key={item.id}>
                           <TableCell>
                              <Link to={`/decks/${item.id}`} className={styles.link}>
                                 <img className={styles.cover} src={coverUrl} alt={'deckCover'} />
                                 <Typography className={styles.name} variant={'body2'} as={'span'}>
                                    {item.name}
                                 </Typography>
                              </Link>
                           </TableCell>
                           <TableCell>{item.cardsCount}</TableCell>
                           <TableCell>{formatDate(new Date(item.updated))}</TableCell>
                           <TableCell>{item.author.name}</TableCell>
                           <TableCell className={styles.icons}>
                              <Button variant={'ghost'} size={'icon'}>
                                 <CirclePlayIcon width={16} height={16} />
                              </Button>
                              {isOwner && (
                                 <>
                                    <Button variant={'ghost'} size={'icon'}>
                                       <PencilIcon width={16} height={16} />
                                    </Button>
                                    <DeleteDeckButton id={item.id} />
                                 </>
                              )}
                           </TableCell>
                        </TableRow>
                     )
                  })}
               </TableBody>
            </Table>
            <div className={styles.paginationWrapper}>
               <Pagination
                  onPageChange={setPage}
                  onPageSizeChange={setPerPage}
                  totalCount={data?.pagination.totalItems ?? 10}
                  currentPage={page}
                  pageSize={perPage}
               />
            </div>
         </div>
      </div>
   )
}
