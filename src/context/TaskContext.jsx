import { createContext, useContext,useReducer,useEffect } from "react";
import { useLocalStorageState } from "../useLocalStorageState";
import { toast } from "sonner"
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
const TaskContext=createContext()

function taskReducer(state, action) {
  switch (action.type) {
    case 'task/add':
      return [...state, action.payload];
    case 'task/remove':
      return state.filter(task => task.id !== action.payload);
    case 'task/clear':
      return [];
    case 'task/toggleFinished':
      return state.map(task =>
        task.id === action.payload ? { ...task, finished: !task.finished } : task
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
    const [tasks, dispatchTask] = useReducer(taskReducer, initialTasks);
    const [sort,setSort]=useLocalStorageState('','last_sort')
    const [sortedTasks, setSortedTasks] = useState(tasks)
    const isDesktopOrLaptop=useMediaQuery({query:'(min-width:992px)'})
    const isTabOrMobile=useMediaQuery({query:'(max-width:992px)'})

    useEffect(() => {
      setTask(tasks);
    }, [tasks]);
    useEffect(() => {
      if (sort === '') setSort('input');
      let updatedSortedTasks = [...tasks]; 
      if (sort === 'alphabet') {
        updatedSortedTasks.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'date') {
        updatedSortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sort === 'important') {
        updatedSortedTasks.sort((a, b) => b.important - a.important);
      } else if (sort === 'unfinished') {
        updatedSortedTasks.sort((a, b) => a.finished - b.finished);
      }
      // Update local state with sorted tasks
      setSortedTasks(updatedSortedTasks);
    }, [tasks, sort]);
    
    
      function handleSort(type){
        setSort(type)
      }
      function handleRemove(id,name){
        const oldTask=tasks
        dispatchTask({type:'task/remove',payload:id})
        toast(`${name} removed`, {
          position:`${isTabOrMobile?"top-center":'bottom-right'}`,
    
          action: {
            label: "Undo",
            onClick: () => dispatchTask({type:'task/undo',payload:oldTask}),
          },
        })
      }

    return <TaskContext.Provider value={{
        tasks,
        handleSort:handleSort,
        handleRemove,
        isDesktopOrLaptop,
        isTabOrMobile,
        sortedTasks,
        dispatchTask
    }}>
        {children}
    </TaskContext.Provider>
}

function useTask(){
    const taskContext=useContext(TaskContext)
    return taskContext
}

export{TaskProvider,useTask}