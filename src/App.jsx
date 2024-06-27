import { useState } from "react";
import "./App.css";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";


export default function App() {

  const [draggableRowsList, setdraggableRowsList] = useState([
    {id: 100, title: "Dont"},
    {id: 200, title: "Call"},
    {id: 300, title: "Her"},
  ]);

  console.log("initial: ", draggableRowsList);
  const getRowPosition = id => draggableRowsList.findIndex(row =>  row.id === id)
;

  const handleDragEnd = event =>{
    const {active, over} = event
    if(active.id === over.id) return;

    setdraggableRowsList(draggableRowsList => {
      const originalPosition = getRowPosition(active.id)
      const newPosition = getRowPosition(over.id)

      console.log("original Postion",originalPosition);
      console.log("New Postion",newPosition);

         
      
      const finalDraggableRowsList =arrayMove(draggableRowsList, originalPosition, newPosition)
      
      /*
      Abstraction Details: arrayMove
      
      arrayMove(array, from, to) {
        const newArray = array.slice();
        newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
        return newArray;
      }
      */
      
      console.log("after", finalDraggableRowsList )
      return finalDraggableRowsList
    })
    
  }

    // console.log("after",)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="App">
      <h1>Drag and Drop Utility</h1>

    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>  
      <Column draggableRowsList={draggableRowsList}/>
    </DndContext>

    </div>
  );
}
