import React, { useState } from 'react';

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'To-Do', // Default status
    startDate: '',
    endDate: '',
    priority: 'Medium'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!newProject.title.trim()) {
      alert("Project title cannot be empty!");
      return;
    }

    // Create a project object with a unique ID
    const projectToAdd = {
      id: Date.now(), // Using timestamp as a simple unique identifier
      ...newProject
    };

    // Call the add project function passed from parent
    onAddProject(projectToAdd);

    // Reset form and close modal
    setNewProject({
      title: '',
      description: '',
      status: 'To-Do',
      startDate: '',
      endDate: '',
      priority: 'Medium'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        
        <input
          name="title"
          placeholder="Project Title"
          value={newProject.title}
          onChange={handleInputChange}
          className="border p-2 rounded mt-2 w-full"
          required
        />
        
        <textarea
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleInputChange}
          rows="3"
          className="border p-2 rounded mt-2 w-full"
        />
        
        <select
          name="status"
          value={newProject.status}
          onChange={handleInputChange}
          className="border p-2 rounded mt-2 w-full"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        
        <select
          name="priority"
          value={newProject.priority}
          onChange={handleInputChange}
          className="border p-2 rounded mt-2 w-full"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mt-2">Start Date</label>
            <input
              name="startDate"
              type="date"
              value={newProject.startDate}
              onChange={handleInputChange}
              className="border p-2 rounded mt-1 w-full"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mt-2">End Date</label>
            <input
              name="endDate"
              type="date"
              value={newProject.endDate}
              onChange={handleInputChange}
              className="border p-2 rounded mt-1 w-full"
            />
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button 
            onClick={handleSubmit}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Project
          </button>
          <button 
            onClick={onClose}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}