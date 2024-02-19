import { createContext, useState } from 'react'

// 1-) Creo el context
export const FilterContext = createContext()

// 2-)Creo el porvider
export function FilterProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
