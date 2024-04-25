import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type APIResults, type User } from './interfaces/usersInterfaces'
import { UserList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [enablePaint, setEnablePaint] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null >(null)

  const [loanding, setLoanding] = useState<boolean>(false)
  const [error, setError] = useState<boolean >(false)

  const [currentPage, setCurrentPage] = useState(1)

  const originalArrayUsers = useRef<User[]>([])

  const toggleColor = () => {
    setEnablePaint(!enablePaint)
  }

  const handleDeleteUsers = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalArrayUsers.current)
  }

  // 1-) Primero filtro
  const filterUsers = useMemo(() => {
    console.log('Filtro la array')
    return filterCountry != null && filterCountry.length > 0 // Esto lo hago para que no se meta aqui si es null
      ? users.filter((user) => {
        return user.location?.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers2 = useMemo(() => {
    console.log('El sorting esta en: ', sorting)
    if (sorting === SortBy.COUNTRY) {
      return [...filterUsers].sort((a, b) => {
        const countryA = a.location?.country ?? ''
        const countryB = b.location?.country ?? ''
        return countryA.localeCompare(countryB)
      })
    } else if (sorting === SortBy.NAME) {
      return [...filterUsers].sort((a, b) => {
        const nameA = a.name?.first ?? ''
        const nameB = b.name?.first ?? ''
        return nameA.localeCompare(nameB)
      })
    } else if (sorting === SortBy.LAST) {
      return [...filterUsers].sort((a, b) => {
        const nameA = a.name?.last ?? ''
        const nameB = b.name?.last ?? ''
        return nameA.localeCompare(nameB)
      })
    }
    return filterUsers
  }, [sorting, filterUsers])

  const toggleSort = () => { // Si no esta ordenado por pais lo ordena, sino lo desordena en none
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sort: SortBy) => {
    console.log(sort)
    setSorting(sort)
  }

  useEffect(() => {
    setLoanding(true)
    setError(false)
    fetch(`https://randomuser.me/api/?results=10&seed=biel=${currentPage}`)
      .then(async res => {
        if (!res.ok) { throw new Error('Error en la petición') }
        return await res.json()
      })
      .then((res: APIResults) => {
        // setUsers(res.results)
        setUsers(prevstate => {
          const newUsers = prevstate.concat(res.results)
          originalArrayUsers.current = newUsers
          return newUsers
        })
        console.log(loanding)
      })
      .catch(error => {
        console.log(error.message)
        setError(true)
      })
      .finally(() => {
        setLoanding(false)
      })
  }, [currentPage])

  return (
    <>
    <h1>Prueba tecnica</h1>
    <header>
      {/* ! Me falta el LOANGIN!!! */}
      <button onClick={() => { toggleColor() }} >Colorear filas</button>
      <button onClick={toggleSort} > {sorting === SortBy.COUNTRY ? 'No ordenar por paises' : 'ordenar por paises'} </button>
      <button onClick={handleReset} >Reset</button>
      <input type="text" placeholder='Filtra por país' onChange={(e) => { setFilterCountry(e.target.value) } } />
    </header>

    <main>
      {
         users.length > 0 && <UserList handleChangeSort={handleChangeSort} users={sortedUsers2} enablePaint={enablePaint} deleteUser={handleDeleteUsers} />
      }
      {loanding && <p>Cargando...</p>}

      {!loanding && error && <p>Ha ocurido un error inesperado</p>}

      {!loanding && !error && users.length === 0 && <p>No se han obtenido resultados</p>}

      {
        !loanding && !error && users.length !== 0 && <button onClick={() => { setCurrentPage(state => state + 1) }}> Cargar más resultados </button>
      }

    </main>

    </>
  )
}

export default App
