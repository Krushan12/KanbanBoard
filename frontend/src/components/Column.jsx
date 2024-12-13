import React from "react";
import TaskComponent from "./Task";

export default function Column({ title, tasks, updateDescription, updateTask }) {
    const filteredTasks = tasks.filter((task) => task.status === title);

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const task = tasks.find((task) => task.id === parseInt(id, 10)); // Convert id to number if needed
        if (task) {
            updateTask({ ...task, status: title }); // Update the task's status
        }
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
            className="bg-gray-100 rounded-lg p-4 shadow-md w-1/3 min-h-screen"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            {filteredTasks.map((task) => (
                <TaskComponent key={task.id} task={task} updateDescription={updateDescription} />
            ))}
        </div>
    );
}
