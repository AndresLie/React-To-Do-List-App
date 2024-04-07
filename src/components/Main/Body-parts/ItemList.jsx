import { useTask } from "../../../context/TaskContext";
import Item from "./Item/Item";
import "./styles/ItemList.css"
export default function ItemList({enable}){
    const {sortedTasks}=useTask()
    return <ul className={`list-group ${enable?"disabled":""}`} >
        {sortedTasks.map((task)=>(
          <Item task={task} key={task.id} />
        ))}
    </ul>
}