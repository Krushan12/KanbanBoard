import React, { useState } from "react";

export default function TaskComponent({ 
  task, 
  updateTask, 
  deleteTask, 
  isDragging = false 
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const priorityColors = {
        High: "border-red-500",
        Medium: "border-yellow-500",
        Low: "border-green-500"
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset edited task when canceling edit
        if (isEditing) {
            setEditedTask({ ...task });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Basic validation
        if (!editedTask.title.trim()) {
            alert("Title cannot be empty!");
            return;
        }

        // Update the task
        updateTask(editedTask);
        setIsEditing(false);
    };

    return (
        <div 
            className={`p-4 bg-white rounded-lg shadow-md m-2 border-l-4 relative group 
                ${priorityColors[task.priority]} 
                ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
            {/* Delete and Edit Buttons */}
            <div className="absolute top-2 right-2 flex space-x-2 z-10">
                {/* Edit Button */}
                <button 
                    onClick={handleEditToggle}
                    className="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Edit task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>

                {/* Delete Button */}
                <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Delete task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Conditional Rendering for View and Edit Modes */}
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        name="title"
                        value={editedTask.title}
                        onChange={handleInputChange}
                        placeholder="Task Title"
                        className="w-full border rounded p-1 mb-2"
                    />
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleInputChange}
                        placeholder="Task Description"
                        className="w-full border rounded p-1 mb-2"
                        rows={3}
                    />
                    <select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleInputChange}
                        className="w-full border rounded p-1 mb-2"
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                    <input
                        name="assignee"
                        value={editedTask.assignee}
                        onChange={handleInputChange}
                        placeholder="Assignee"
                        className="w-full border rounded p-1 mb-2"
                    />
                    <input
                        name="dueDate"
                        type="date"
                        value={editedTask.dueDate}
                        onChange={handleInputChange}
                        className="w-full border rounded p-1 mb-2"
                    />
                    <div className="flex justify-end space-x-2">
                        <button 
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button 
                            onClick={handleEditToggle}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-lg font-bold text-gray-700 pr-8">{task.title}</h3>
                    <p className="text-gray-700 mt-1">{task.description}</p>
                    
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
                </>
            )}
        </div>
    );
}