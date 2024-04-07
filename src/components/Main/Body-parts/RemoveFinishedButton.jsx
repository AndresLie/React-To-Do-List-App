import {memo} from 'react'
import './styles/Button.css'
import { useTask } from '../../../context/TaskContext'
function RemoveFinishedButton(){
    const {dispatchTask}=useTask()
    return(
        <button type="button" className="btn btn-outline-warning" onClick={()=>dispatchTask({type:'task/removeFinished'})}>
            Remove Finished Task
        </button>
    )
}

export default memo(RemoveFinishedButton)