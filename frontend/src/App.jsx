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
  

  return (
    < >
      <KanbanBoard tasks={tasks} updateDescription={updateDescription}/>
    </>
  )
}

export default App
