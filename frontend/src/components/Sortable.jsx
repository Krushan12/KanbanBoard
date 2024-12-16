import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskComponent from './Task';

export function SortableTask({ task, updateTask, deleteTask, filterMode, columnTitle }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: task.id,
    data: { 
      task, 
      columnTitle 
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
    >
      <TaskComponent 
        task={task} 
        updateTask={updateTask} 
        deleteTask={deleteTask}
        isDragging={isDragging}
      />
    </div>
  );
}