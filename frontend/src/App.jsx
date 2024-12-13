import KanbanBoard from './components/KanbanBoard';

import React, { useState } from 'react'; 
import { tasks as initialTasks} from './utils/data';


function App() {
  const [tasks, setTasks] = useState(initialTasks)
      
      const updateDescription = (id,newDescription) =>{
          setTasks((prevTasks)=>
              prevTasks.map((task)=>
              task.id === id ? {...task, description: newDescription}: task
              )
          )
      } 

      const updateTask = (updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      };
  

  return (
    < >
      <KanbanBoard tasks={tasks} updateDescription={updateDescription} updateTask={updateTask}/>
    </>
  )
}

export default App
