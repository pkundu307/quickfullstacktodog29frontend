
import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login';
function App() {
    const [page, setPage] = useState(localStorage.getItem('token') ? 'todos' : 'login');

  return (
    
<>
{page === 'login' && <div><Login/></div>
}

{page === 'todos' && <div>Todos Component Here</div>}
</>
  )
}

export default App
