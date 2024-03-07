"use client"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"

export function DatePickerDemo({date,setDate}) {

  const isMobile=useMediaQuery({query:'(max-width:992px)'})
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${isMobile?"w-[317%]":"w-[15vw]"} justify-start text-left font-normal`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => {
          // Create a new date object for "today" with the time set to 00:00:00.000
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          // Disable dates before today
          return date < today;
        }}
        initialFocus
      />
      </PopoverContent>
    </Popover>
  )
}
