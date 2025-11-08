import axios from "axios";
import React, { useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const [task,setTask]=React.useState({
    title:'',
    description:''
  });
  const [updating,setUpdating]=React.useState(false);
  const [updatingId,setUpdatingId]=React.useState(null);

  useEffect(() => {
    // Fetch todos from API
    axios
      .get("/api/todos/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTodos(response.data.todos);
        setTimeout(()=>{},1000);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);
  console.log('====================================');
  setTimeout(()=>{},1000);
  console.log(todos);
  console.log('====================================');

  const handleSubmit=(e)=>{
    e.preventDefault();
    //add todo api call
    try {
        if(updating){
            axios.put(`/api/todos/update/${updatingId}`,{
                title:task.title,
                description:task.description
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }   
            }).then((response)=>{
                alert("Todo updated successfully");
                setTodos([...todos,response.data.todo]);
                setTask({title:'',description:''});
                setUpdating(false);
                setUpdatingId(null);
                window.location.reload();
            })
            
        } else{
        axios.post("/api/todos/create",{
            title:task.title,
            description:task.description
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }   
        }).then((response)=>{
            alert("Todo added successfully");
            setTodos([...todos,response.data.todo]);
            setTask({title:'',description:''});
        })
        }
    } catch (error) {
        console.error(error);
        alert("Failed to add todo");
    }
  }
  const handleDelete= (id) => {
    //delete todo api call

    try {
        axios.delete(`/api/todos/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }   
        }).then((response)=>{
            alert("Todo deleted successfully",response.data);
            setTodos(todos.filter((todo) => todo._id !== id));
        });

    } catch (error) {
        console.error(error);
        alert("Failed to delete todo");
    }
  }

    const handleEdit= (id,title,description) => {
        setUpdatingId(id);
    //delete todo api call
        setUpdating(true);
        setTask({
            title,
            description
        });

  }
  const handleToggleComplete= (id,completed) => {
    //toggle complete api call
console.log(id,completed);

    try {
      axios.put(`/api/todos/update/${id}`
      ,{
        completed: !completed
      },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }   
    }).then((response)=>{
        alert("Todo status updated successfully",response.data);
        setTodos(todos.map((todo) => todo._id === id ? {...todo,completed:!completed} : todo));
        window.location.reload();
    });
    } catch (error) {

        console.error(error);
        alert("Failed to update todo status");
    }
  }


  return (
    <>
    <navbar>
      <div
      className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg mt-4 flex justify-between items-center z-10 sticky top-0 bg-white"
      >
        <h1
        className="text-3xl font-bold"
        >Todo App</h1>
        <button
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
        onClick={()=>{
            localStorage.removeItem("token");
            window.location.reload();
        }}
        >Logout</button>
      </div>
    </navbar>
    <div 
    className="p-4 max-w-lg mx-auto border rounded-lg shadow-lg mt-4"
    >
      <h2
      className="text-2xl font-bold mb-4"
      >TodoList</h2>
        <div
        className="mb-4 flex items-center justify-center flex-direction-row"
        >
            <form action="">
                <label htmlFor=""
                className="mr-2"
                >Task</label>
                <input 
                className="mr-4 border p-1 rounded"
                type="text" value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})}/>
<br />
                <label htmlFor=""
                className=" mr-2"
                >Description</label>
                <input 
                className="mr-4 border p-1 rounded"
                type="text" value={task.description} onChange={(e)=>setTask({...task,description:e.target.value})}/>

        <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={handleSubmit}>{updating ? "Update" : "Add Todo"}</button>

            </form>
        </div>


      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <h3
                className={`font-bold mb-2 ${todo.completed ? 'line-through text-gray-500' : 'text-green-600'}`}
                >{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                <button
                onClick={()=>handleToggleComplete(todo._id,todo.completed)}
                className={`mr-2 ${todo.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white p-1 rounded hover:${todo.completed ? 'bg-yellow-600' : 'bg-green-600'} transition duration-300 ease-in-out`}
                >{todo.completed ? "Mark as Incomplete" : "Mark as Completed"}</button>
                <button
                className="mr-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                onClick={()=>handleEdit(todo._id,todo.title,todo.description)}>Update</button>
                <button onClick={()=>handleDelete(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  );
};

export default TodoList;
