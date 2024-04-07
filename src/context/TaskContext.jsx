import { createContext, useContext,useReducer,useEffect,useCallback } from "react";
import { useLocalStorageState } from "../useLocalStorageState";
import { toast } from "sonner"
import { useMediaQuery } from "react-responsive";
const TaskContext=createContext()

function taskReducer(state, action) {
  switch (action.type) {
    case 'task/add':
      return [...state, action.payload];
    case 'task/remove':
      return state.filter(task => task.id !== action.id);
    case 'task/clear':
      return [];
    case 'task/toggleFinished':
      return state.map(task =>
        task.id === action.id ? { ...task, finished: !task.finished } : task
      );
    case 'task/removeFinished':
      return state.filter(task => !task.finished);
    case 'task/undo':
      return action.payload;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}



function TaskProvider({children}){
    const [initialTasks, setTask] = useLocalStorageState([], 'myTask');
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
    const [sort,setSort]=useLocalStorageState('','last_sort')
    const isDesktopOrLaptop=useMediaQuery({query:'(min-width:992px)'})
    const isTabOrMobile=useMediaQuery({query:'(max-width:992px)'})
    let sortedTask=[]
    useEffect(() => {
      setTask(tasks);
    }, [tasks]);
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


      function handleClearItem(){
        dispatch({type:'task/clear'})
      }
      function handleSort(type){
        setSort(type)
      }
      function handleRemove(id,name){
        const oldTask=tasks
        dispatch({type:'task/remove',id:id})
        toast(`${name} removed`, {
          position:`${isTabOrMobile?"top-center":'bottom-right'}`,
    
          action: {
            label: "Undo",
            onClick: () => dispatch({type:'task/undo',payload:oldTask}),
          },
        })
      }

    return <TaskContext.Provider value={{
        tasks,
        handleSort:handleSort ,
        handleClearItem,
        handleRemove,
        isDesktopOrLaptop,
        isTabOrMobile,
        sortedTask,
        dispatch
    }}>
        {children}
    </TaskContext.Provider>
}

function useTask(){
    const taskContext=useContext(TaskContext)
    return taskContext
}

export{TaskProvider,useTask}