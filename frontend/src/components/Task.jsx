import React from "react";

export default function TaskComponent({ task }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md m-2 border-l-2" >
      <h3 className="text-lg font-bold text-gray-500 ">{task.title}</h3>
      <p className="text-gray-700 mt-1">{task.description}</p>
      <p className="text-gray-800 mt-1"><strong>Assigned to:</strong> {task.assignee}</p>
      <p className="text-gray-800 mt-1 " ><strong>Priority:</strong>  {task.priority}</p>
      <p className="text-gray-800 mt-1 "><strong>Due:</strong>  {task.dueDate}</p>
    </div>
  );
}
