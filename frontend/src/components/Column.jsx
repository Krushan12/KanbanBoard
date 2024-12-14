import React, { useState, useCallback } from "react";
import TaskComponent from "./Task";
import { FormInput, FormTextarea, FormSelect } from './FormComponents';
import { 
    useDroppable,
    useDraggable
  } from '@dnd-kit/core';
  import { 
    rectSortingStrategy,
    SortableContext,
    verticalListSortingStrategy
  } from '@dnd-kit/sortable';

export default function Column({ 
  title, 
  tasks, 
  updateDescription, 
  updateTask, 
  addTask, 
  deleteTask 
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: title.replace(" Priority", ""),
    assignee: "",
    dueDate: "",
    status: title
  });

  const { setNodeRef } = useDroppable({
    id: title,
  });

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' }
  ];

  const handleInputChange = useCallback((e) => {
    const {name, value} = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleAddTask = useCallback(() => {
    if (!newTask.title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const taskToAdd = {
      id: `task-${Date.now()}`,
      ...newTask,
      status: title
    };

    addTask(taskToAdd);
    
    setNewTask({
      title: "",
      description: "",
      priority: title.replace(" Priority", ""),
      assignee: "",
      dueDate: "",
      status: title
    });
    setIsFormVisible(false);
  }, [newTask, title, addTask]);

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md w-1/3 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button 
          onClick={() => setIsFormVisible(true)} 
          className="px-4 py-2 bg-gray-950 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          Add Task
        </button>
      </div>

      {isFormVisible && (
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md space-y-2">
          <FormInput
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
          
          <FormTextarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          
          <FormSelect
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            options={priorityOptions}
            label="Task Priority"
          />
          
          <FormInput
            name="assignee"
            placeholder="Assignee Name"
            value={newTask.assignee}
            onChange={handleInputChange}
          />
          
          <FormInput
            name="dueDate"
            type="date"
            value={newTask.dueDate}
            onChange={handleInputChange}
            label="Due Date"
          />
          
          <div className="flex space-x-2">
            <button 
              onClick={handleAddTask}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Task
            </button>
            <button 
              onClick={() => setIsFormVisible(false)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <SortableContext 
        id={title}
        items={tasks.map(task => `task-${task.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-2">
          {tasks.map((task) => (
            <TaskComponent 
              key={task.id}
              task={task} 
              updateDescription={updateDescription} 
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </SortableContext>
    
    </div>
  );
}