import { FILTER_BUTTONS } from '../interfaces/const'
import { type filterValues } from '../interfaces/types'

interface Props {
  filterSelected: filterValues
  onFilterChange: (filter: filterValues) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
        <ul className="filters">
            {
              Object.entries(FILTER_BUTTONS).map(([key, { href, literal }]) => {
                const isSelected = key === filterSelected
                const className = isSelected ? 'selected' : ''
                return (
                  <li key={key}>
                    <a
                       href={href}
                       className={className}
                       onClick={(event) => {
                         event.preventDefault()
                         onFilterChange(key as filterValues)
                       }}
                       >
                      {literal}
                    </a>
                  </li>
                )
              })
            }
        </ul>
  )
}
