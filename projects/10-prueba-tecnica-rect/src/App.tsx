import { useEffect, useState } from 'react'
import './App.css'
import { type APIResults, type User } from './interfaces/usersInterfaces'
import { UserList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5')
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
     <UserList users={users} />
    </>
  )
}

export default App
