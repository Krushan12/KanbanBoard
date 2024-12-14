import React, { useState, useEffect, useCallback } from 'react'; 
import KanbanBoard from './components/KanbanBoard';
import { tasks as initialTasks } from './utils/data';
import Sidebar from './components/SideBar';
import AddProjectModal from './components/ProjectModel';
import { 
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';


function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use useEffect for localStorage sync
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Memoized update functions to prevent unnecessary re-renders
  const updateDescription = useCallback((id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      )
    );
  }, []);

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

  // Centralized drag and drop handler
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
  
    // Ensure both active and over exist
    if (active && over && active.id !== over.id) {
      setTasks((prevTasks) => {
        // Find the dragged task
        const draggedTask = prevTasks.find(task => `task-${task.id}` === active.id);
        
        if (draggedTask) {
          // Create a new task with updated status
          const newTask = {
            ...draggedTask,
            status: over.id.toString().replace(' Priority', '') // Handle priority column names
          };
  
          // Replace the old task with the updated one
          return prevTasks.map(task => 
            task.id === draggedTask.id ? newTask : task
          );
        }
  
        return prevTasks;
      });
    }
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
    setIsProjectModalOpen(true);
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
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
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
            updateDescription={updateDescription} 
            updateTask={updateTask}
            addTask={addTask}
            deleteTask={deleteTask}
            filterMode={isFilterMode}
          />
        </div>
      </div>
    </DndContext>   
  );
}

export default App;