import { useState } from 'react'
import './App.css'
import { mockTodos } from './mocks/todos'
import { Todos } from './components/Todos'
import { type todos, type todoId, type filterValues, type todoTitle } from './interfaces/types'
import { TODO_FILTERS } from './interfaces/const'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<filterValues>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: todoId): void => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: filterValues): void => {
    setFilterSelected(filter)
  }

  const handleCompleted = ({ id, completed }: Pick<todos, 'id' | 'completed'>): void => {
    const newTodos = todos.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed // ESto es lo mismo que poiner completed: compelted
        }
      } return item
    })
    setTodos(newTodos)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = ({ title }: todoTitle): void => {
    setTodos([
      {
        completed: false,
        id: crypto.randomUUID(),
        title
      },
      ...todos
    ])
  }

  const activeCounts = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCounts

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
    <Header onAddTodo={handleAddTodo}/>
    <Todos handleRemove={handleRemove}
    handleCompleted={handleCompleted}
    todos={filteredTodos} />

    <Footer
        activeCount={activeCounts}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
    />
    </div>
  )
}

export default App
