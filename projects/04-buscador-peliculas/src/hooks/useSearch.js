import { useState, useEffect, useRef } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  console.log('Se esta rerendeizando useSearch')

  useEffect(() => {
    // Con la referencia hago que la primera vez que se inicie no salga en rojo
    // Al ser useReff no se renderiza con cada busqueda nueva
    if (isFirstInput.current) {
      isFirstInput.current = search === '' // * sera igual a false si hay algo escrito
      return
    }

    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe contener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])
  return { search, setSearch, error }
}
