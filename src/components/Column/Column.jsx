import React from "react";
import './Column.css'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Row } from "../Row/Row";


export const Column = ({draggableRowsList}) => {
    return(
        <div className="column">
            <SortableContext items={draggableRowsList} strategy={verticalListSortingStrategy}>
            {draggableRowsList.map(row => 
                <Row id={row.id} title={row.title} key={row.id}/>
            )}
            </SortableContext>
        </div>
    )
}