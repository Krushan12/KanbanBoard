import React, { useState } from "react";

export default function TaskComponent({ task, updateDescription, updateTask }) {
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
            className={`p-4 bg-white rounded-lg shadow-md m-2 border-l-4 ${priorityColors[task.priority]}`}
        >
            <div className="flex justify-between">
                <h3 className="text-lg font-bold text-gray-700">{task.title}</h3>
                <button  className="px-2 py-2  text-sm bg-gray-950 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all" >Delete Task</button>
            </div>
            
            
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