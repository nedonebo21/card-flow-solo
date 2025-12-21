const FILTER_KEYS = ['page', 'name', 'min', 'max']

export const clearFilters = (params: URLSearchParams) => {
   FILTER_KEYS.forEach(k => params.delete(k))
}
