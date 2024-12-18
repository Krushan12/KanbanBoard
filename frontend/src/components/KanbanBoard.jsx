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

    // Ensure consistent order for columns
    const columnTitles = filterMode 
      ? ['High Priority', 'Medium Priority', 'Low Priority']
      : ['To-Do', 'In Progress', 'Done'];

    return columnTitles.reduce((acc, title) => {
      acc[title] = groups[title] || [];
      return acc;
    }, {});
  }, [tasks, filterMode]);

  // Titles based on filter mode
  const columnTitles = filterMode 
    ? ['High Priority', 'Medium Priority', 'Low Priority']
    : ['To-Do', 'In Progress', 'Done'];

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Allow small movements without triggering drag
      },
    }),
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
      // Check if task is moved to a different column
      const currentColumnTitle = columnTitles.find(title => 
        filteredTasks[title].some(t => t.id === active.id)
      );

      if (currentColumnTitle !== activeColumnTitle) {
        // Update task's column
        const updatedTask = {
          ...draggedTask,
          ...(filterMode 
            ? { priority: activeColumnTitle.replace(" Priority", "") }
            : { status: activeColumnTitle }
          )
        };

        updateTask(updatedTask);
      } else {
        // Reorder within the same column
        const columnTasks = filteredTasks[activeColumnTitle];
        const activeIndex = columnTasks.findIndex(task => task.id === active.id);
        const overIndex = columnTasks.findIndex(task => task.id === over.id);

        if (activeIndex !== overIndex) {
          const reorderedTasks = arrayMove(columnTasks, activeIndex, overIndex);
          
          // Update entire tasks array
          const updatedTasks = tasks.filter(task => 
            !columnTasks.some(t => t.id === task.id)
          ).concat(reorderedTasks);

          // Dispatch full task list update
          updateTask(reorderedTasks[overIndex]);
        }
      }
    }

    setActiveTask(null);
  }, [tasks, filteredTasks, filterMode, updateTask, columnTitles]);

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