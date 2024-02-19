import { useCallback, useContext } from 'react'
import { FilterContext } from '../context/filters'

export function useFilters (products) {
  const { filters, setFilters } = useContext(FilterContext)

  const filterProducts = useCallback((products) => {
    return products.filter((products) => {
      return (products.price >= filters.minPrice && (products.category === filters.category || filters.category === 'all'))
    })
  }, [filters])

  return { setFilters, filterProducts, filters }
}
