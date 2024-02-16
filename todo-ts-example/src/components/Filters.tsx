import { FILTER_BUTTONS } from "../consts"
import { FilterValues } from "../types"

interface Props {
  filterSelected: FilterValues
  onFilterChange: (filter: FilterValues) => void
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
              <a href={href} className={className} onClick={
                (event) => {
                  event.preventDefault()
                  onFilterChange(key as FilterValues)
                }
              }>
                {literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}