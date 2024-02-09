import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef('')

  // Se seguira creando (NO EJECUTAND) cada vez que escribo pero por lo menos no cuando clicko en sort
  // Solo se ejecutara cuando se llame no cuando cambie nada
  // Esta pasado por parametro en para optimizar
  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return

    try {
      previousSearch.current = search
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  , [])

  //! console.log('buenos dias')

  // Use memo evita que se vuelva a renderizar con cada camvio de sort o search (Porque search cambia cada vez que escribo)
  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  // si esta activado que se ordene por titulos devolvera lista ordenada sino la lista normal
  return { movies: sortedMovies, getMovies, loading, error }
}
