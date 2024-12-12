import KanbanBoard from './components/KanbanBoard';

import React from 'react'; 
import { tasks} from './utils/data';


function App() {


  return (
    < >
      <KanbanBoard tasks={tasks}/>
    </>
  )
}

export default App
