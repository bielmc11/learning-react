import { useState } from 'react'
import { type todoTitle } from '../interfaces/types'

interface Props {
  saveTodo: ({ title }: todoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            className='new-todo'
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value) }} // Al poner value= inputValue tengo que actulizarlo cada vez que escribo
            onKeyDown={() => {}}
            autoFocus
            placeholder='¿Qué quieres hacer?'/>
    </form>

  )
}
