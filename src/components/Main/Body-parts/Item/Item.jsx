import { useState } from "react";
import "../styles/item.css";
import { Button } from "@/components/ui/button";
import { useTask } from "../../../../context/TaskContext";

export default function Item({ task }) {
    const {handleFinished,handleRemove}=useTask()

    let style={}
    if(task.finished) style={ backgroundColor: 'rgb(60, 179, 113)' };
    else if(task.important) style={ backgroundColor: 'coral' };
    return (
        <li className="list-group-item" style={style}>
            <input type='checkbox' checked={task.finished} onChange={()=>handleFinished(task.id)}></input>
            <div className="item-box">
                {task.name}
                <span>Due : {task.date ? task.date : "None"}</span>
            </div>
            <Button variant="destructive" onClick={() => handleRemove(task.id,task.name)}>Remove</Button>
        </li>
    );
}
