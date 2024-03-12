import { type props } from '../interfaces/types'
import { Todo } from './Todo'

export const Todos: React.FC<props> = ({ todos, handleRemove, handleCompleted }) => {
  return (
        <ul className='todo-list'>
            {
                todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <Todo
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            handleCompleted={ handleCompleted }
                            handleRemove={handleRemove} />

                    </li>
                ))
            }
        </ul>
  )
}
