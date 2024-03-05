import { useState } from 'react'
import './styles/Form.css'
import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"
import { toast } from "sonner"
import { DatePickerDemo } from './Item/DatePicker'
export default function Form({onAddTask}){
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
        toast("New Task Added", {
            description: date?`${task} is Due on ${date}`:`Added ${task}`,
            action: {
            //   label: "Undo",
            //   onClick: () => console.log("Undo"),
            },
          })
        onAddTask(newTask)
        setDate("")
        setTask("")
        setImportant(false)
    }
    
    return (
    <form className="form" onSubmit={handleSubmit} id='newTaskForm'>
        <Input style={{width:'40%'}} placeholder="Things To do.." className='input-task' value={task} onChange={(e)=>setTask((task)=>e.target.value) }></Input>
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