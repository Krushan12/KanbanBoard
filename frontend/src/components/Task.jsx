import React, { useState } from "react";

export default function TaskComponent({ task, updateDescription, updateTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(task.description);

    const priorityColors = {
        High: "border-red-500",
        Medium: "border-yellow-500",
        Low: "border-green-500"
    };

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        if (description.trim()) {
            setIsEditing(false);
            updateDescription(task.id, description.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setIsEditing(false);
            setDescription(task.description);
        }
    };

    return (
        <div 
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("id", task.id);
            }}
            className={`p-4 bg-white rounded-lg shadow-md m-2 border-l-4 relative group ${priorityColors[task.priority]}`}
        >
            {/* Delete Button */}
            <button 
                onClick={() => deleteTask(task.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Delete task"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            <h3 className="text-lg font-bold text-gray-700 pr-8">{task.title}</h3>
            
            {isEditing ? (
                <input 
                    type="text" 
                    value={description} 
                    autoFocus 
                    onChange={handleChange} 
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded p-1 mt-1"
                />
            ) : (
                <p 
                    onClick={handleClick} 
                    className="text-gray-700 mt-1 cursor-pointer"
                >
                    {task.description}
                </p>
            )}
            
            <div className="mt-2 text-sm">
                <p className="text-gray-800">
                    <strong>Assigned to:</strong> {task.assignee}
                </p>
                <p className="text-gray-800">
                    <strong>Priority:</strong> {task.priority}
                </p>
                <p className="text-gray-800">
                    <strong>Due:</strong> {task.dueDate}
                </p>
            </div>
        </div>
    );
}