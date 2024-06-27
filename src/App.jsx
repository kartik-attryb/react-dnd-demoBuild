import { useState } from "react";
import "./App.css";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";


export default function App() {

  const [tasks, setTasks] = useState([
    {id: 100,title: "Dont"},
    {id: 200, title: "Call"},
    {id: 300, title: "Her"},
  ]);

  console.log("initial: ", tasks);
  const getTaskPosition = id => tasks.findIndex(task =>  task.id === id)
;

  const handleDragEnd = event =>{
    const {active, over} = event
    

    if(active.id === over.id) return;

    setTasks(tasks => {
      const originalPosition = getTaskPosition(active.id)
      const newPosition = getTaskPosition(over.id)

      console.log("original Postion",originalPosition);
      console.log("New Postion",newPosition);

         
      
      const temp =arrayMove(tasks, originalPosition, newPosition)
      console.log("after", temp ) 
      return temp
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
      <Column tasks={tasks}/>
    </DndContext>

    </div>
  );
}
