import './styles/Button.css'
export default function RemoveFinishedButton({handleFinished}){
    return(
        <button type="button" className="btn btn-outline-warning" onClick={handleFinished}>Remove Finished Task</button>
    )
}