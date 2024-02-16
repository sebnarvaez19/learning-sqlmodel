import { TodoId, TodoIdCompleted, Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleted: ({ id, completed }: TodoIdCompleted) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted({id, completed: event.target.checked})
  }
  
  return (
    <div className='View'>
      <input className='toggle' type='checkbox' checked={completed} onChange={handleChangeCheckbox} />
      <label>{title}</label>
      <button className='destroy' onClick={() => {onRemoveTodo({id})}} />
    </div>

  )
}