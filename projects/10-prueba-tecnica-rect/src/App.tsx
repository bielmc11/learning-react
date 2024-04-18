import { useEffect, useState } from 'react'
import './App.css'
import { type APIResults, type User } from './interfaces/usersInterfaces'
import { UserList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [enablePaint, setEnablePaint] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)

  const toggleColor = () => {
    setEnablePaint(!enablePaint)
  }

  const handleDeleteUsers = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })
    setUsers(filteredUsers)
  }

  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => {
        const countryA = a.location?.country ?? ''
        const countryB = b.location?.country ?? ''
        return countryA.localeCompare(countryB)
      })
    : users

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10')
      .then(async res => await res.json())
      .then((res: APIResults) => {
        setUsers(res.results)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
    <h1>Prueba tecnica</h1>
    <div>
      <button onClick={() => { toggleColor() }} >Colorear filas</button>
      <button onClick={() => { setSortByCountry(!sortByCountry) }} >Ordenar por pais</button>
    </div>
     <UserList users={sortedUsers} enablePaint={enablePaint} deleteUser={handleDeleteUsers} />
    </>
  )
}

export default App
