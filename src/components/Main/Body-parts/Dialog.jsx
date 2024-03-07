import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "./Item/DatePicker"
import { useState } from "react"
import { toast } from "sonner"
import './styles/Form.css'
export function DialogDemo({onAddTask}) {
    const[date,setDate]=useState(null)
    const [task,setTask]=useState("")
    const [important,setImportant]=useState(false)
    // const { toast } = useToast()
    function handleSubmit(e){
        e.preventDefault()
        if(!task) return
        if (document.activeElement && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
          document.activeElement.blur();
        }
        const newTask = {
            name: task,
            date: date ? date.toLocaleDateString() : "",
            id: crypto.randomUUID(),
            finished: false,
            important
          };
          const formattedDate = date.toISOString().split('T')[0];
          toast("New Task Added", {
              position:'top-center',
              description: date?`${task} is Due on ${formattedDate}`:`Added ${task}`,
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

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mobile-add-btn">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>

        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add New Task Here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name" className="text-left">
              Task
            </Label>
            <Input id="name" value={task} className="col-span-3"  onChange={(e)=>setTask(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-2" >
          <Label htmlFor="name" className="text-left">
              Deadline
            </Label>
            <DatePickerDemo className="date-button" date={date} setDate={setDate} onChange={(e)=>setDate((date)=>e.target.value)}
            ></DatePickerDemo>
        </div>
        <div className="grid grid-cols-4 items-center gap-2">
        <Label htmlFor="name" className="text-left">
              Important
            </Label>
            <input type='checkbox' style={{justifySelf:'left'}} checked={important} id="important"
            onChange={()=>setImportant((val)=>!val)}></input>
            
            </div>  
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
            </form>
      </DialogContent>
    </Dialog>
        
  )
}
