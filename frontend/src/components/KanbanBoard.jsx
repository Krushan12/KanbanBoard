import React from "react";
import Column from "./Column";

export default function KanbanBoard({ tasks, updateDescription,updateTask }) {
    

  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      <Column title="To-Do" tasks={tasks} updateDescription={updateDescription} updateTask={updateTask} />
      <Column title="In Progress" tasks={tasks} updateDescription={updateDescription} updateTask={updateTask}/>
      <Column title="Done" tasks={tasks} updateDescription={updateDescription} updateTask={updateTask} />
    </div>
  );
}
