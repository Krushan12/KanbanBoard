import React, { useState, useEffect } from 'react'; 
import KanbanBoard from './components/KanbanBoard';
import { tasks as initialTasks } from './utils/data';
import Sidebar from './components/SideBar';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateDescription = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => 
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const handleAddProject = () => {
    console.log('Add Project clicked');
  };

  const handleFilterTasks = () => {
    console.log('Filter Tasks clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar 
        onAddProject={handleAddProject}
        onFilterTasks={handleFilterTasks}
        onSettings={handleSettings}
        isExpanded={isSidebarExpanded}
        toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      
      {/* Main Content */}
      <div 
        className={`flex-grow transition-all duration-300 ${
          isSidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <header className="bg-gray-900 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">Kanban Board</h1>
        </header>
        <KanbanBoard 
          tasks={tasks} 
          updateDescription={updateDescription} 
          updateTask={updateTask}
          addTask={addTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
