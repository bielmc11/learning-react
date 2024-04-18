import { type User } from '../interfaces/usersInterfaces'
import './UserList.css'
interface Props {
  users: User[]
  enablePaint: boolean
  deleteUser: (email: string) => void
}

export function UserList ({ users, enablePaint, deleteUser }: Props) {
  const paintTable = enablePaint ? 'paint' : ''
  return (
      <table width='100%'>
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
            users.map((user) => {
              return (
                    <tr key={user.email} className={paintTable}>
                        <td>
                            <img src={user.picture?.thumbnail} alt="Imagen de Perfil" />
                        </td>
                        <td>{user.name?.first}</td>
                        <td>{user.name?.last}</td>
                        <td>{user.location?.country} </td>
                        <td>
                          <button onClick={() => { deleteUser(user.email) }} >Elimianar</button>
                        </td>
                    </tr>
              )
            })
        }
        </tbody>
      </table>
  )
}
