import React,{useState} from 'react'
import API from '../api';

const Register = () => {
    const [form,setForm] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(form.password !== form.confirmPassword){
        //     alert("Passwords do not match");
        //     return;
        // }
        try{
           const res =  await API.post('/auth/register',{
                name:form.name,
                email:form.email,
                password:form.password
            });
            alert(res.data);
        }catch(err){
            console.error(err);
            alert("Registration failed");
        }
    }

  return (
    <div>
      <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg mt-4">

        <h2
        className='text-2xl font-bold mb-4 '
        >Reister</h2>
        <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}>
            <input
            className='border p-2 rounded'
            type="text" placeholder='name' onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <br/>
            <input
            className='border p-2 rounded'
            type="text" placeholder='email' onChange={(e)=>setForm({...form,email:e.target.value})}/>
            <br />
            <input 
            className='border p-2 rounded'
            type="password"  placeholder='password' onChange={(e)=>setForm({...form,password:e.target.value})}/>
            <br />
            <button
            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition'
            onSubmit={handleSubmit}
            >Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
