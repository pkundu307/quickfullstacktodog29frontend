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
      .get("http://localhost:5000/api/todos/all", {
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
            axios.put(`http://localhost:5000/api/todos/update/${updatingId}`,{
                title:task.title,
                description:task.description
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }   
            }).then((response)=>{
                alert("Todo updated successfully");
                setTodos([...todos,response.data.todo]);
                window.location.reload();
            })
            
        } else{
        axios.post("http://localhost:5000/api/todos/create",{
            title:task.title,
            description:task.description
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }   
        }).then((response)=>{
            alert("Todo added successfully");
            setTodos([...todos,response.data.todo]);
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
        axios.delete(`http://localhost:5000/api/todos/delete/${id}`,{
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


  return (
    <div>
      <h2>TodoList</h2>
        <div>
            <form action="">
                <label htmlFor="">Task</label>
                <input type="text" value={task.title} onChange={(e)=>setTask({...task,title:e.target.value})}/>
                <label htmlFor="">Description</label>
                <input type="text" value={task.description} onChange={(e)=>setTask({...task,description:e.target.value})}/>

        <button onClick={handleSubmit}>{updating ? "Update" : "Add Todo"}</button>

            </form>
        </div>


      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                <button onClick={()=>handleEdit(todo._id,todo.title,todo.description)}>Update</button>
                <button onClick={()=>handleDelete(todo._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
