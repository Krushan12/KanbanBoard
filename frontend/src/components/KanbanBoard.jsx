import React from "react";
import Column from "./Column";

export default function KanbanBoard({ tasks, updateDescription }) {


  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      <Column title="To-Do" tasks={tasks} updateDescription={updateDescription} />
      <Column title="In Progress" tasks={tasks} updateDescription={updateDescription}/>
      <Column title="Done" tasks={tasks} updateDescription={updateDescription} />
    </div>
  );
}
