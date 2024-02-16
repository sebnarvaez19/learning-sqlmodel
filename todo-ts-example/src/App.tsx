import { Todos } from './components/Todos'
import { useState } from 'react'
import { TodoId, TodoIdCompleted } from './types'

const mockToDos = [
  { id: '1', title: 'ToDo 1', completed: true },
  { id: '2', title: 'ToDo 2', completed: false },
  { id: '3', title: 'ToDo 3', completed: false }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockToDos)

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

  return (
    <div className='todoapp'>
      <Todos
         todos={todos}
         onRemoveTodo={handleRemove}
         onToggleCompleted={handleComplete}
      />
    </div>
  )
}

export default App
