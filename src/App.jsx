
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/Main/Header/Header.jsx'
import AddButton from './components/Main/Body-parts/AddButton.jsx'
import ClearButon from './components/Main/Body-parts/ClearButton'
import Form from './components/Main/Body-parts/Form'
import ItemList from './components/Main/Body-parts/ItemList'
import SortOption from './components/Main/Body-parts/SortOption.jsx'
import RemoveFinishedButton from './components/Main/Body-parts/RemoveFinishedButton.jsx'
import Main from './components/Main/Main.jsx'
import Item from './components/Main/Body-parts/Item/Item.jsx'
import { useState } from 'react'
import { useLocalStorageState } from './useLocalStorageState.jsx'
import { Toaster } from "@/components/ui/sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function App({tasks,setTask}) {
  const [openForm,setOpenForm]=useState(false)
  const [sort,setSort]=useState('input')

  let sortedTask=[]
  if(sort==='input') sortedTask=tasks
  else if(sort==='alphabet'){
    sortedTask=tasks.slice().sort((a,b)=>a.name.localeCompare(b.name))
  }
  else if(sort==='date'){
    sortedTask=tasks.slice().sort((a,b)=>b.date.localeCompare(a.date))
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
  function handleOpenForm(){
    setOpenForm((val)=>!val)
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
    setSort(()=>type)
  }
  function handleRemove(id){
    setTask((tasks) =>tasks.filter((task)=>task.id!=id))
  }
  function handleFinished(id){
    setTask((tasks)=>tasks.map((task)=>task.id===id?{...task,finished: !task.finished}:task))
  }
  function handleRemoveFinished(){
    setTask((tasks)=> tasks.filter((task)=>!task.finished))
  }

  return (
    <>
    <Header />
    <Main>
      {openForm && <Form onAddTask={handleAddTask}/>}
      <div className='options'>
        <SortOption handleSort={handleSort}/>
        <RemoveFinishedButton handleFinished={handleRemoveFinished} />
        <ClearButon handleClick={handleClearItem}/>
      </div>
      <ItemList>
        {sortedTask.map((task)=>(
          <Item task={task} key={task.id} handleRemove={handleRemove} handleFinished={handleFinished}/>
        ))}
      </ItemList>
      <AddButton onClick={handleOpenForm}>
        {openForm?"Cancel":"Add"}
      </AddButton>
    </Main>
    <Toaster />
    </>
  )
}

export default App