import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import App from "./App"
import { useEffect, useState } from "react"
import { useLocalStorageState } from "./useLocalStorageState"
import { Accordion_ } from "./components/Schedule/Acccordion"

export default function Layout() {
    const[tasks,setTask]=useLocalStorageState([],'myTask')
    let sortedTask=[]
    useEffect(
      function(){
        sortedTask=tasks.slice().sort((a,b)=>b.date.localeCompare(a.date))
      }
      ,[tasks])
    let taskByDate={}
    tasks.map((task)=>
      taskByDate[task.date]?taskByDate[task.date].push([task.name]):taskByDate[task.date]=[task.name]
      )

    
  return (
    <Tabs defaultValue="main" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="main">
        <App tasks={tasks} setTask={setTask}/>
      </TabsContent>
      <TabsContent value="schedule">
        <Accordion_ task={taskByDate} n={taskByDate.length} />
      </TabsContent>
      
    </Tabs>
  )
}
