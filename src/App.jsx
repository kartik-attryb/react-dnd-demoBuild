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

  //Gets/sets the final array of row object after the drag and drop operation
  const handleDragEnd = event =>{
    // Get initial and final index of the selected row item
    const getInitialAndFinalIndex = (draggableRowsList)=>{
      const {active, over} = event //event object defines the selected row item through active and over keys
      const activeId = active.id //active key provides the id of selected row item
      const overId = over.id //over key provides the id of of the row item replaced by selected row item

      //getIndex fetches the index of the id provided
      const getIndex = id => draggableRowsList.findIndex(row =>  row.id === id);
      const initialIndex = getIndex(activeId)
      const finalIndex = getIndex(overId)

      return [initialIndex, finalIndex]
    }

    const [initialIndex, finalIndex] = getInitialAndFinalIndex(draggableRowsList)
    const finalDraggableRowsList =arrayMove(draggableRowsList, initialIndex, finalIndex)
    setdraggableRowsList(finalDraggableRowsList)

  }

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
