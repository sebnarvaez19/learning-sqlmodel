import { FilterValues } from "../types"
import { Filters } from "./Filters"

interface Props {
  activeCount: number,
  completedCount: number,
  filterSelected: FilterValues,
  handleFilterSelected: (filter: FilterValues) => void,
  onClearCompleted: () => void,
}

export const Footer: React.FC<Props> = ({
  activeCount = 2,
  completedCount = 1,
  filterSelected,
  handleFilterSelected,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count"><strong>{activeCount}</strong> items left. <strong>{completedCount}</strong> Resolved.</span>
      <Filters filterSelected={filterSelected} onFilterChange={handleFilterSelected} />
      {
        completedCount > 0 && (
          <button className="clear-completed" onClick={onClearCompleted}>Delete completed</button>
        )
      }
    </footer>
  )
}