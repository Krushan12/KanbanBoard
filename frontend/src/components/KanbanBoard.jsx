import React, { useState, useMemo, useCallback } from 'react';
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
  verticalListSortingStrategy, 
  SortableContext 
} from '@dnd-kit/sortable';

import Column from "./Column";
import TaskComponent from "./Task";

export default function KanbanBoard({ 
  tasks, 
  updateTask, 
  addTask, 
  deleteTask,
  reorderTasks,
  filterMode = false 
}) {
  const [activeTask, setActiveTask] = useState(null);

  const filteredTasks = useMemo(() => {
    const groupKey = filterMode ? 'priority' : 'status';
    
    // Group tasks by priority or status
    const groups = tasks.reduce((acc, task) => {
      const groupTitle = filterMode 
        ? `${task[groupKey]} Priority`
        : task[groupKey];
      
      if (!acc[groupTitle]) {
        acc[groupTitle] = [];
      }
      acc[groupTitle].push(task);
      return acc;
    }, {});

    return groups;
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

    if (!active || !over) {
      setActiveTask(null);
      return;
    }

    // Determine column keys based on filter mode
    const groupKey = filterMode ? 'priority' : 'status';
    
    // Get the column titles
    const activeColumnTitle = over.data.current.columnTitle;
    const draggedTask = tasks.find(task => task.id === active.id);

    // If task is dropped in a different column
    if (active.id !== over.id) {
      const updatedTask = {
        ...draggedTask,
        ...(filterMode 
          ? { priority: activeColumnTitle.replace(" Priority", "") }
          : { status: activeColumnTitle }
        )
      };

      // Update the task's status or priority
      updateTask(updatedTask);
    } else {
      // If dropped in the same column, reorder tasks
      const columnTasks = filteredTasks[activeColumnTitle];
      reorderTasks(columnTasks, active.id, over.id);
    }

    setActiveTask(null);
  }, [tasks, filteredTasks, filterMode, updateTask, reorderTasks]);

  // Handle drag cancel
  const handleDragCancel = useCallback(() => {
    setActiveTask(null);
  }, []);

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