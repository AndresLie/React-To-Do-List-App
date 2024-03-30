import { createContext, useContext } from "react";
import { useLocalStorageState } from "../useLocalStorageState";
import { Toaster } from 'sonner'
import { toast } from "sonner"
import { useMediaQuery } from "react-responsive";
const TaskContext=createContext()



function TaskProvider({children}){
    const[tasks,setTask]=useLocalStorageState([],'myTask')
    const [sort,setSort]=useLocalStorageState('','last_sort')
    const isDesktopOrLaptop=useMediaQuery({query:'(min-width:992px)'})
    const isTabOrMobile=useMediaQuery({query:'(max-width:992px)'})
    let sortedTask=[]
    if(sort==='')setSort('input')
    if(sort==='input') sortedTask=tasks
    else if(sort==='alphabet'){
        sortedTask=tasks.slice().sort((a,b)=>a.name.localeCompare(b.name))
    }
    else if(sort==='date'){
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday
    
        const formatDate = (dateStr) => {
        if(dateStr.toLowerCase() === '') {
            // Format yesterday's date as YYYY-MM-DD
            return yesterday.toISOString().split('T')[0];
        } else {
            // Assuming dateStr is in MM/DD/YYYY format
            const parts = dateStr.split('/');
            const formatted = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
            return formatted;
        }
        };
    
        sortedTask = tasks.slice().sort((a, b) => {
        const dateA = new Date(formatDate(a.date));
        const dateB = new Date(formatDate(b.date));
        return dateA - dateB; // Sort chronologically
        });
    }
    else if (sort === 'important') {
        sortedTask = tasks.slice().sort((a, b) => {
        return Number(b.important) - Number(a.important);
        });
    }
    else if (sort === 'unfinished') {
        sortedTask = tasks.slice().sort((a, b) => {
        return Number(a.finished) - Number(b.finished);
        });
    }

      function handleAddTask(newTask){
        if (!newTask.name) return
        setTask((tasks)=>[...tasks,newTask])
        sortedTask=tasks
      }
      function handleClearItem(){
        setTask([])
      }
      function handleSort(type){
        setSort(type)
      }
      function handleRemove(id,name){
        const oldTask=tasks
        setTask((tasks) =>tasks.filter((task)=>task.id!=id))
        toast(`${name} removed`, {
          position:`${isTabOrMobile?"top-center":'bottom-right'}`,
    
          action: {
            label: "Undo",
            onClick: () => setTask(()=>oldTask),
          },
        })
      }
      function handleFinished(id){
        setTask((tasks)=>tasks.map((task)=>task.id===id?{...task,finished: !task.finished}:task))
      }
      function handleRemoveFinished(){
        setTask((tasks)=> tasks.filter((task)=>!task.finished))
      }

    return <TaskContext.Provider value={{
        tasks,
        onAddTask:handleAddTask,
        handleSort:handleSort ,
        handleRemoveFinished,
        handleClearItem,
        handleRemove,
        handleFinished,
        isDesktopOrLaptop,
        isTabOrMobile,
        sortedTask
    }}>
        {children}
    </TaskContext.Provider>
}

function useTask(){
    const taskContext=useContext(TaskContext)
    return taskContext
}

export{TaskProvider,useTask}