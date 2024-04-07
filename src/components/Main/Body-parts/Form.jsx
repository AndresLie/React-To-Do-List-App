import { useState } from 'react'
import './styles/Form.css'
import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"
import { DatePickerDemo } from './Item/DatePicker'
import { useTask } from '../../../context/TaskContext'
export default function Form(){
    const {dispatchTask}=useTask()
    const[date,setDate]=useState(null)
    const [task,setTask]=useState("")
    const [important,setImportant]=useState(false)
    // const { toast } = useToast()
    function handleSubmit(e){
        e.preventDefault()
        if(!task) return
        const newTask = {
            name: task,
            date: date ? date.toLocaleDateString() : "",
            id: crypto.randomUUID(),
            finished: false,
            important
          };
        if (date) {
            const newDate = new Date(date.getTime()); // Clone date to avoid mutating the original state
            newDate.setDate(newDate.getDate() + 1);
            const formattedDate = newTask.date ? newDate.toISOString().split('T')[0] : "";
            toast("New Task Added", {
                description: `${task} is Due on ${formattedDate}`,
            });
        } else {
            toast("New Task Added", {
                description: `Added ${task}`,
            });
        }
        dispatchTask({ type: 'task/add', payload: newTask });
        setDate("")
        setTask("")
        setImportant(false)
    }
    
    return (
    <form className="form" onSubmit={handleSubmit} id='newTaskForm'>
        <Input style={{}} placeholder="Things To do.." className='input-task' value={task} onChange={(e)=>setTask((task)=>e.target.value) }></Input>
        <span>
            {"Due : "} 
        <DatePickerDemo date={date} setDate={setDate} onChange={(e)=>setDate((date)=>e.target.value)}
        ></DatePickerDemo>
        </span>
        <div>

        <input type='checkbox' checked={important}
            onChange={()=>setImportant((val)=>!val)}></input>
        <label>Important</label>
        </div>
        <button className="btn btn-outline-secondary">Add</button>
    </form>)
}