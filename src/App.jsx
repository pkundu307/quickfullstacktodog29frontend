
import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login';
import TodoList from './components/TodoList';
function App() {
    const [page, setPage] = useState(localStorage.getItem('token') ? 'todos' : 'login');

  return (
    
<>
{page === 'login' && <div><Login/></div>
}

{page === 'todos' && <div><TodoList/></div>}
</>
  )
}

export default App
