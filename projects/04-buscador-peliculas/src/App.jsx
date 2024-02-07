import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
function App () {
  // No se si es correcto pasarle la lista desde aqui o meter el customHook dentro del componente Movies
  const { search, setSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const handleSort = () => {
    setSort(!sort)
  }

  const debouncedGetMovies = useCallback(debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    //! aqui puedo hacer prevalidaciones
    const newQuery = event.target.value
    // No dejo que comience por espacio
    if (newQuery.charAt(0) === ' ') {
      event.target.value = ''
    }

    setSearch(newQuery)
    // Llamo a la api
    debouncedGetMovies(newQuery)
  }

  return (
    <div className='page'>
      <header>
        <form onSubmit={handleSubmit}>
          <label htmlFor='query'>Escriba la pelicla que sea buscar:</label>
          <input className={error && 'error'} onChange={handleChange} value={search} name='query' id='query' type='text' />
          <input type='checkbox' onClick={handleSort} />
          <button type='submit'>Enviar</button>
        </form>
        {error && <p style={{ color: 'red' }}> {error} </p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

export default App
