import React, { useState } from "react";
import Column from "./Column";

export default function KanbanBoard({ 
  tasks, 
  updateDescription, 
  updateTask, 
  addTask, 
  deleteTask,
  filterMode = false 
}) {
  // If in filter mode, organize tasks by priority while preserving status
  if (filterMode) {
    return (
      <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
        <Column 
          title="High Priority" 
          tasks={tasks.filter(task => task.priority === "High")} 
          updateDescription={updateDescription} 
          updateTask={updateTask} 
          addTask={addTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="Medium Priority" 
          tasks={tasks.filter(task => task.priority === "Medium")} 
          updateDescription={updateDescription} 
          updateTask={updateTask} 
          addTask={addTask}
          deleteTask={deleteTask}
        />
        <Column 
          title="Low Priority" 
          tasks={tasks.filter(task => task.priority === "Low")} 
          updateDescription={updateDescription} 
          updateTask={updateTask} 
          addTask={addTask}
          deleteTask={deleteTask}
        />
      </div>
    );
  }

  // Default Kanban board view
  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      <Column 
        title="To-Do" 
        tasks={tasks.filter(task => task.status === "To-Do")} 
        updateDescription={updateDescription} 
        updateTask={updateTask} 
        addTask={addTask}
        deleteTask={deleteTask}
      />
      <Column 
        title="In Progress" 
        tasks={tasks.filter(task => task.status === "In Progress")} 
        updateDescription={updateDescription} 
        updateTask={updateTask} 
        addTask={addTask}
        deleteTask={deleteTask}
      />
      <Column 
        title="Done" 
        tasks={tasks.filter(task => task.status === "Done")} 
        updateDescription={updateDescription} 
        updateTask={updateTask} 
        addTask={addTask} 
        deleteTask={deleteTask}
      />
    </div>
  );
}