import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import type { TypographyOwnProps } from './typography'

import { Typography } from '@/shared/ui/typography'

const meta = {
   title: 'Typography',
   component: Typography,
   parameters: { layout: 'centered' },
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

const variants: TypographyOwnProps['variant'][] = [
   'h1',
   'h2',
   'h3',
   'h4',
   'body1',
   'body2',
   'subtitle1',
   'subtitle2',
   'caption',
   'overline',
   'link1',
   'link2',
   'error',
   'warning',
]

const styles: CSSProperties = {
   display: 'flex',
   flexDirection: 'column',
   gap: 10,
}

export const All: Story = {
   args: { children: 'Example' },
   render: () => (
      <div style={styles}>
         {variants.map(v => (
            <Typography key={v} variant={v}>
               {v}
            </Typography>
         ))}
      </div>
   ),
}
