import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function Accordion_({task}) {    
    return (
        <Accordion type="multiple" collapsible className="w-full">
        {Object.entries(task).map(([date, tasks], index) => (
        <AccordionItem value={`item-${index}`} key={date}>
          <AccordionTrigger>{date?date:"None"}</AccordionTrigger>
            {tasks.map((task)=>(
                <AccordionContent>
                    {task}
                </AccordionContent>
            ))}
        </AccordionItem>
      ))}
      </Accordion>
    )
  }
  