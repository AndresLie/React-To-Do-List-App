
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
import { useState } from 'react'
import { DialogDemo } from './components/Main/Body-parts/Dialog.jsx'
import { Toaster } from 'sonner'
import { useLocalStorageState } from './useLocalStorageState.jsx'
import { useTask } from './context/TaskContext.jsx'

function App() {
  const{isDesktopOrLaptop,isTabOrMobile}=useTask()
  const [openForm,setOpenForm]=useState(false)
  const [sort,setSort]=useLocalStorageState('','last_sort')
  const [disableList,setDisableList]=useState(false)
  
  function handleOpenForm(){
    if(isDesktopOrLaptop)setOpenForm((val)=>!val)
  }
  function handleSelectOpen(open){
    setDisableList(()=>open)
  }

  return (
    <>
    <Header />
    <Main>
      {openForm && <Form/>}
      <div className='options'>
        <SortOption  handleOpen={handleSelectOpen} sort={sort} setSort={setSort}/>
        <RemoveFinishedButton  />
        <ClearButon />
      </div>
      <ItemList enable={disableList} />
      {isTabOrMobile&&<DialogDemo />}
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
