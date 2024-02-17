import { Todos } from './components/Todos'
import { useEffect, useState } from 'react'
import { FilterValues, ListOfTodos, TodoId, TodoIdCompleted, TodoTitle } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const apiPath = "http://localhost:8000/tasks/"

const App: React.FC = () => {
  const [todos, setTodos] = useState<ListOfTodos>([])
  const fecthTodos = async () => {
    const response = await fetch(apiPath)
    const todos: ListOfTodos = await response.json()
    setTodos(todos)
  }

  useEffect(() => {
    fecthTodos()
  }, [])

  const [filterSelected, setFilterSelected] = useState<FilterValues>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId) => {
    fetch(apiPath + `${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(fecthTodos)
  }

  const handleComplete = ({ id, completed }: TodoIdCompleted ) => {
    const body = { completed: completed }

    fetch(apiPath + `${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(fecthTodos)
  }

  const handleFilterChange = (filter: FilterValues) => {
    setFilterSelected(filter)
  }

  const handleRemoveCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed)
    completedTodos.map((todo) => {handleRemove({id: todo.id})})
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo =>{
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

const handleAddTodo = ({ title }: TodoTitle ) => {
  const body = {title: title}

  fetch(apiPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(fecthTodos)
}

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo}/>
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
