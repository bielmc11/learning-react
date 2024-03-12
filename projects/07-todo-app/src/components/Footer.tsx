import { type filterValues } from '../interfaces/types'
import { Filters } from './Filter'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: filterValues
  onClearCompleted: () => void
  handleFilterChange: (filter: filterValues) => void
}

export const Footer: React.FC<Props> = ({ activeCount = 0, completedCount = 0, filterSelected, handleFilterChange, onClearCompleted }) => {
  return (
        <footer className="footer">
            <span className="todo-count">
                <strong> {activeCount} </strong> tareas pendientes
            </span>
            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

            {
              completedCount > 0 && (
                <button onClick={onClearCompleted} className='clear-completed'>
                  Borrar todos los compeltados
                </button>
              )
            }
        </footer>
  )
}
