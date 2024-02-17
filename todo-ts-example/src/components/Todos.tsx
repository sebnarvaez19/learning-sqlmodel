import { ListOfTodos, TodoId, TodoIdCompleted } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: (id: TodoId) => void
  onToggleCompleted: ({id, completed}: TodoIdCompleted) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {  
  return (
    <ul className='todo-list'>
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
          <Todo id={todo.id} title={todo.title} completed={todo.completed} onRemoveTodo={onRemoveTodo} onToggleCompleted={onToggleCompleted} />
        </li>
      ))}
    </ul>
  )
}
