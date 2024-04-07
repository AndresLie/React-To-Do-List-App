import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import App from "./App"
import { memo } from "react"
import { Accordion_ } from "./components/Schedule/Acccordion"
import { useTask } from "./context/TaskContext"
function Layout() {
    const{tasks}=useTask()
    let sortedTask=[]
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
    let taskByDate={}
    sortedTask.map((task)=>
      taskByDate[task.date]?taskByDate[task.date].push([task.name]):taskByDate[task.date]=[task.name]
      )

    
  return (
    
    <Tabs defaultValue="main" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="main">
        <App />
      </TabsContent>
      <TabsContent value="schedule">
        <Accordion_ task={taskByDate} n={taskByDate.length} />
      </TabsContent>
    </Tabs>
  )
}

export default memo(Layout)