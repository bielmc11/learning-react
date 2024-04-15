import { type User } from '../interfaces/usersInterfaces'

interface Props {
  users: User[]
}

export function UserList ({ users }: Props) {
  return (
    <main>
      <h2>TABLA DE USUARIOS</h2>
      <table width={'100%'}>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
        {
            users.map(user => {
              return (
                    <tr key={user.id?.value}>
                        <td>
                            <img src={user.picture?.thumbnail} alt="" />
                        </td>
                        <td>{user.name?.first}</td>
                        <td>{user.name?.last}</td>
                        <td>{user.location?.country} </td>
                        <td>Borrar</td>
                    </tr>
              )
            })
        }
        </tbody>
      </table>
    </main>
  )
}
