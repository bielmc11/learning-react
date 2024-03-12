import { type TODO_FILTERS } from './const'

export interface todos {
  completed: boolean
  id: string
  title: string
}

export interface todos2 extends todos {
  handleRemove: ({ id }: todoId) => void
  handleCompleted: ({ id, completed }: { id: string, completed: boolean }) => void
}

// ES LO MISMO: export type todoList = todos['id']
export type todoId = Pick<todos, 'id'>

export type todoComplete = Pick<todos, 'completed'>

export type todoTitle = Pick<todos, 'title'>

export interface props {
  todos: todos[]
  handleRemove: ({ id }: todoId) => void
  handleCompleted: ({ id, completed }: { id: string, completed: boolean }) => void
}

export type filterValues = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
