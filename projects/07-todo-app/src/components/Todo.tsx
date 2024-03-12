import { type todos2 } from '../interfaces/types'

export const Todo: React.FC<todos2> = ({ id, title, completed, handleRemove, handleCompleted }) => {
  const handleChangeCheckBok = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleCompleted({ id, completed: event.target.checked })
  }

  return (
        <div className='view'>
            <input onChange={handleChangeCheckBok} type="checkbox" checked={completed} className='toggle'/>
            <label>{title}</label>
            <button className='destroy' onClick={() => { handleRemove({ id }) }}></button>
        </div>
  )
}
