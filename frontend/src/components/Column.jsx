import TaskComponent from "./Task";
import React, { useState } from "react";

export default function Column({ title, tasks, updateDescription }) {
    const filteredTasks = tasks.filter((task) => task.status === title);
    
    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow-md w-1/3 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 " >{title}</h2>
        {filteredTasks.map((task) => (
            <TaskComponent key={task.id} task={task} updateDescription={updateDescription} />
        ))}
        </div>
    );
}
