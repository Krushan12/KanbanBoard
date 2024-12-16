import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragOverlay 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates, 
  rectSortingStrategy, 
  SortableContext 
} from '@dnd-kit/sortable';

import Column from "./Column";
import TaskComponent from "./Task";
import { SortableTask } from "./Sortable";

export default function KanbanBoard({ 
  tasks, 
  updateTask, 
  addTask, 
  deleteTask,
  filterMode = false 
}) {
  const [activeTask, setActiveTask] = useState(null);

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

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  const handleDragStart = useCallback((event) => {
    const { active } = event;
    setActiveTask(tasks.find(task => task.id === active.id));
  }, [tasks]);

  // Handle drag end
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    // If task is dropped in a different column
    if (active.id !== over.id) {
      const oldColumnTitle = getColumnTitleForTask(active.id, filteredTasks);
      const newColumnTitle = over.data.current.columnTitle;

      // Update the task's status or priority based on the column
      const updatedTask = {
        ...tasks.find(task => task.id === active.id),
        ...(filterMode 
          ? { priority: newColumnTitle.replace(" Priority", "") }
          : { status: newColumnTitle }
        )
      };

      // Remove task from old column and add to new column
      updateTask(updatedTask);
    }

    setActiveTask(null);
  }, [tasks, filteredTasks, filterMode, updateTask]);

  // Handle drag cancel
  const handleDragCancel = useCallback(() => {
    setActiveTask(null);
  }, []);

  // Helper function to get column title for a task
  const getColumnTitleForTask = (taskId, taskGroups) => {
    for (const [title, tasksInColumn] of Object.entries(taskGroups)) {
      if (tasksInColumn.some(task => task.id === taskId)) {
        return title;
      }
    }
    return null;
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-row gap-4 p-4 bg-gray-50 min-h-screen">
        {columnTitles.map((title) => (
          <Column 
            key={title}
            title={title} 
            tasks={filteredTasks[title] || []} 
            updateTask={updateTask} 
            addTask={addTask}
            deleteTask={deleteTask}
            filterMode={filterMode}
          />
        ))}

        <DragOverlay>
          {activeTask ? (
            <TaskComponent 
              task={activeTask} 
              updateTask={updateTask} 
              deleteTask={deleteTask}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}