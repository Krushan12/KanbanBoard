import React, { useMemo } from 'react';
import Column from "./Column";

export default function KanbanBoard({ 
  tasks, 
  updateDescription, 
  updateTask, 
  addTask, 
  deleteTask,
  filterMode = false 
}) {
  // Memoize filtered tasks to prevent unnecessary re-renders
  const filteredTasks = useMemo(() => {
    if (filterMode) {
      return {
        'High Priority': tasks.filter(task => task.priority === "High"),
        'Medium Priority': tasks.filter(task => task.priority === "Medium"),
        'Low Priority': tasks.filter(task => task.priority === "Low")
      };
    }
    
    return {
      'To-Do': tasks.filter(task => task.status === "To-Do"),
      'In Progress': tasks.filter(task => task.status === "In Progress"),
      'Done': tasks.filter(task => task.status === "Done")
    };
  }, [tasks, filterMode]);

  // Titles based on filter mode
  const columnTitles = filterMode 
    ? ['High Priority', 'Medium Priority', 'Low Priority']
    : ['To-Do', 'In Progress', 'Done'];

  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      {columnTitles.map((title) => (
        <Column 
          key={title}
          title={title} 
          tasks={filteredTasks[title] || []} 
          updateDescription={updateDescription} 
          updateTask={updateTask} 
          addTask={addTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}