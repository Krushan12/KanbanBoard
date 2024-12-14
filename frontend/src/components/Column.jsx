import React, { useState } from "react";
import TaskComponent from "./Task";

export default function Column({ title, tasks, updateDescription, updateTask, addTask, deleteTask }) {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        priority: title.replace(" Priority", ""), // Set priority based on column title
        assignee: "",
        dueDate: "",
        status: "To-Do" // Default status when creating a new task
    });

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const task = tasks.find((task) => task.id === parseInt(id, 10)); 
        if (task) {
            updateTask({ ...task, status: title });
        }
    };

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setNewTask((prev)=>({
            ...prev,[name]:value
        }))
    }

    const handleAddTask = () => {
        if (!newTask.title.trim()) {
            alert("Task title cannot be empty!");
            return;
        }

        const taskToAdd = {
            id: Date.now(),
            ...newTask,
            status: "To-Do" // Always set to To-Do when creating a new task
        };

        addTask(taskToAdd);
        
        setNewTask({
            title: "",
            description: "",
            priority: title.replace(" Priority", ""),
            assignee: "",
            dueDate: "",
            status: "To-Do"
        });
        setIsFormVisible(false);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()} 
            className="bg-gray-100 rounded-lg p-4 shadow-md w-1/3 min-h-screen"
        >
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
                <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
                    <input
                        name="title"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className="border p-2 rounded mt-2 w-full"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        rows="2"
                        className="border p-2 rounded mt-2 w-full"
                    />
                    <select
                        name="priority"
                        value={newTask.priority}
                        onChange={handleInputChange}
                        className="border p-2 rounded mt-2 w-full"
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                    <input
                        name="assignee"
                        placeholder="Assignee Name"
                        value={newTask.assignee}
                        onChange={handleInputChange}
                        className="border p-2 rounded mt-2 w-full"
                    />
                    <input
                        name="dueDate"
                        type="date"
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                        className="border p-2 rounded mt-2 w-full"
                    />
                    <div className="flex space-x-2 mt-2">
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
    );
}