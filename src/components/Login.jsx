import React,{useState} from 'react'
import API from '../api';
import Register from './Register';

const Login = () => {
    const [form,setForm] = useState({
        email:'',
        password:''
    });
    const [loginEnable,setLoginEnable]=useState(true);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
try {
    const res = await API.post('/auth/login',{
        email: form.email,
        password: form.password
    });

    localStorage.setItem('token', res.data.token);
    console.log('====================================');
    console.log('Login successful:', res.data);
    console.log('====================================');
    window.location.reload();
} catch (error) {
    console.error(error);
    alert("Login failed");
}

    }
  return (
    <div>
        {/* //conditional renderingS */}
     {loginEnable && <>
     <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg mt-4">
        <h2
        className='text-2xl font-bold mb-4'
        >Login</h2>
        <form
        className='flex flex-col gap-4'
        action="" onSubmit={handleSubmit}>
            <input
            className='border p-2 rounded'
            type="text" name="email" placeholder='email' onChange={handleChange}/>
            <br/>
            <input
            className='border p-2 rounded'
            type="password" name="password" placeholder='password' onChange={handleChange}/>
            <br/>
            <button
            className='bg-blue-500 text-white p-2 rounded hover:bg-green-600 transition'
            type="submit">Login</button>
            
        </form>
      </div>
      <div
      className='max-w-md mx-auto mt-4 flex items-center justify-center'
      >     <span
     className='text-sm text-grey-300'
     >Don't have an account?</span> <button style={{marginLeft:'10px',color:'blue'}} onClick={()=>setLoginEnable(false)}>Register</button>
     </div>

     </>
     }


     {!loginEnable && <>
     <Register/>
     <div className='max-w-md mx-auto mt-4 flex items-center justify-center'>          <span
          className='text-sm text-grey-300'
          >Already have an account?</span> <button style={{marginLeft:'10px',color:'blue'}} onClick={()=>setLoginEnable(true)}>Login</button>
</div>

     </>}
    </div>
  )
}

export default Login
