import { useEffect, useState } from 'react'
import './styles/SortOption.css'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export default function SortOption({handleSort,handleOpen}){
    const [sort,setSort]=useState("input")
    useEffect(()=>handleSort(sort),[sort])
    const handleOpenChange = (open) => {
        handleOpen(open)
      };
    return(
        <div className="sort-option">
        <span>Sort By : </span>
        <Select className="sort-option" value={sort} onValueChange={setSort} onOpenChange={handleOpenChange}>
        <SelectTrigger>
            <SelectValue placeholder="input" />
        </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="alphabet">Alphabet</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="unfinished">Unfinished</SelectItem>
                </SelectGroup>
            </SelectContent>

        </Select>
        </div>
    )
}