import { useContext } from 'react'
import './styles/Button.css'
import { useTask } from '../../../context/TaskContext'
export default function RemoveFinishedButton(){
    const {handleRemoveFinished}=useTask()
    return(
        <button type="button" className="btn btn-outline-warning" onClick={handleRemoveFinished}>Remove Finished Task</button>
    )
}