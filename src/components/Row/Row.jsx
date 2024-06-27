import React from "react";
import './Row.css'
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
export const Row = ({id, title}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transition: transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div 
        ref = {setNodeRef} 
        {...attributes} 
        {...listeners} 
        style={style}
        className="task"
        >
            <input type="checkbox" className="checkbox"/>
            {title}
        
        </div>
    )
}
