import { Todos } from './components/Todos'
import { useState } from 'react'
import { FilterValues, TodoId, TodoIdCompleted } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'

const mockToDos = [
  { id: '1', title: 'ToDo 1', completed: true },
  { id: '2', title: 'ToDo 2', completed: false },
  { id: '3', title: 'ToDo 3', completed: false }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockToDos)
  const [filterSelected, setFilterSelected] = useState<FilterValues>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = ({ id, completed }: TodoIdCompleted ) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed}
      }
      
      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValues) => {
    setFilterSelected(filter)
  }

  const handleRemoveCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo =>{
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <Todos
         todos={filteredTodos}
         onRemoveTodo={handleRemove}
         onToggleCompleted={handleComplete}
      />
      <Footer 
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterSelected={handleFilterChange}
        onClearCompleted={handleRemoveCompleted}
      />
    </div>
  )
}

export default App
