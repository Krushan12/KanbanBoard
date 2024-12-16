import React, { useState, useEffect, useCallback } from 'react'; 
import KanbanBoard from './components/KanbanBoard';
import { tasks as initialTasks } from './utils/data';
import Sidebar from './components/SideBar';
import AddProjectModal from './components/ProjectModel';



function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

 

  // Use useEffect for localStorage sync
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Memoized update functions to prevent unnecessary re-renders
  

  const updateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }, []);

  const addTask = useCallback((newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => 
      prevTasks.filter((task) => task.id !== id)
    );
  }, []);

  

  const addProject = useCallback((newProject) => {
    const projectTask = {
      id: newProject.id,
      title: newProject.title,
      description: newProject.description,
      priority: newProject.priority,
      status: newProject.status,
      assignee: "Unassigned",
      dueDate: newProject.endDate,
      isProject: true
    };

    addTask(projectTask);
    setIsProjectModalOpen(false);
  }, [addTask]);

  // Handlers with useCallback
  const handleAddProject = useCallback(() => {
    setIsProjectModalOpen(prev => !prev);
  }, []);

  const handleFilterTasks = useCallback(() => {
    setIsFilterMode(prev => !prev);
  }, []);

  const handleSettings = useCallback(() => {
    console.log('Settings clicked');
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded(prev => !prev);
  }, []);

  return (
    <div
    >
      {/* Rest of your existing JSX remains the same */}
      <div className="flex">
        <AddProjectModal 
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onAddProject={addProject}
        />

        <Sidebar 
          onAddProject={handleAddProject}
          onFilterTasks={handleFilterTasks}
          onSettings={handleSettings}
          isExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
          isFilterMode={isFilterMode}
        />
        
        <div 
          className={`flex-grow transition-all duration-300 ${
            isSidebarExpanded ? 'ml-64' : 'ml-16'
          }`}
        >
          <header className="bg-gray-900 text-white p-4 text-center">
            <h1 className="text-3xl font-bold">
              {isFilterMode ? 'Priority Filter' : 'Kanban Board'}
            </h1>
          </header>
          <KanbanBoard 
            tasks={tasks} 
            updateTask={updateTask}
            addTask={addTask}
            deleteTask={deleteTask}
            filterMode={isFilterMode}
          />
        </div>
      </div>
      </div>
      
  );
}

export default App;