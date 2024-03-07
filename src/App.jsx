
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
import {useMediaQuery} from 'react-responsive'
import { DialogDemo } from './components/Main/Body-parts/Dialog.jsx'
import { Toaster } from 'sonner'
import { toast } from "sonner"

function App({tasks,setTask}) {
  const [openForm,setOpenForm]=useState(false)

  const [sort,setSort]=useState('input')
  const [disableList,setDisableList]=useState(false)
  const isDesktopOrLaptop=useMediaQuery({query:'(min-width:992px)'})
  const isTabOrMobile=useMediaQuery({query:'(max-width:992px)'})
  let sortedTask=[]
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
  function handleOpenForm(){
    if(isDesktopOrLaptop)setOpenForm((val)=>!val)

      
    
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
  function handleSelectOpen(open){
    setDisableList(()=>open)
  }

  return (
    <>
    <Header />
    <Main>
      {openForm && <Form onAddTask={handleAddTask}/>}
      <div className='options'>
        <SortOption handleSort={handleSort} handleOpen={handleSelectOpen}/>
        <RemoveFinishedButton handleFinished={handleRemoveFinished} />
        <ClearButon handleClick={handleClearItem}/>
      </div>
      <ItemList enable={disableList}>
        {sortedTask.map((task)=>(
          <Item task={task} key={task.id} handleRemove={handleRemove} handleFinished={handleFinished}/>
        ))}
      </ItemList>
      {isTabOrMobile&&<DialogDemo onAddTask={handleAddTask}/>}

      {isDesktopOrLaptop&&
        <AddButton onClick={handleOpenForm}>
        {openForm?"Cancel":"Add"}
      </AddButton>
      }
    </Main>
    <Toaster closeButton/>
    </>
  )
}

export default App
