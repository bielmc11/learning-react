import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filter () {
  const { setFilters, filters } = useFilters()
  const idMinPrice = useId()
  const idCategory = useId()

  const handleChangeMinPrice = (event) => {
    // Hay un error porque hay dos fuentes de al verdad
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='idMinPrice'>Precio a partir de: </label>
        <input onChange={handleChangeMinPrice} type='range' value={filters.minPrice} name='price' id={idMinPrice} min='0' max='1000' />
        <p> {filters.minPrice} </p>
      </div>

      <div>
        <label htmlFor='idCategory'>Categorías</label>
        <select onChange={handleChangeCategory} name='category' id={idCategory}>
          <option value='all'>All</option>
          <option value='laptops'>Portatiles</option>
          <option value='smartphones'>Moviles</option>
        </select>

      </div>
    </section>
  )
}
