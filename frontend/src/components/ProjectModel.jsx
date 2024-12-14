import React, { useState } from 'react';
import Modal from './Modal';
import { FormInput, FormTextarea, FormSelect } from './FormComponents';

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'To-Do',
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
    if (!newProject.title.trim()) {
      alert("Project title cannot be empty!");
      return;
    }

    const projectToAdd = {
      id: Date.now(),
      ...newProject
    };

    onAddProject(projectToAdd);
    onClose();
  };

  const statusOptions = [
    { value: 'To-Do', label: 'To-Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add New Project"
      onSubmit={handleSubmit}
      submitLabel="Add Project"
    >
      <div className="space-y-2">
        <FormInput
          name="title"
          value={newProject.title}
          onChange={handleInputChange}
          placeholder="Project Title"
          required
        />
        
        <FormTextarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          rows={3}
        />
        
        <FormSelect
          name="status"
          value={newProject.status}
          onChange={handleInputChange}
          options={statusOptions}
          label="Project Status"
        />
        
        <FormSelect
          name="priority"
          value={newProject.priority}
          onChange={handleInputChange}
          options={priorityOptions}
          label="Project Priority"
        />
        
        <div className="flex space-x-2">
          <FormInput
            name="startDate"
            type="date"
            value={newProject.startDate}
            onChange={handleInputChange}
            label="Start Date"
            className="flex-1"
          />
          
          <FormInput
            name="endDate"
            type="date"
            value={newProject.endDate}
            onChange={handleInputChange}
            label="End Date"
            className="flex-1"
          />
        </div>
      </div>
    </Modal>
  );
}