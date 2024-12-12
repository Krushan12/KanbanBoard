import React from "react";
import Column from "./Column";

export default function KanbanBoard({ tasks }) {
  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      <Column title="To-Do" tasks={tasks} />
      <Column title="In Progress" tasks={tasks} />
      <Column title="Done" tasks={tasks} />
    </div>
  );
}
