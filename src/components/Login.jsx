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
} catch (error) {
    console.error(error);
    alert("Login failed");
}

    }
  return (
    <div>
        //conditional renderingS
     {loginEnable && <>
     <div className="p-4">
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder='email' onChange={handleChange}/>
            <br/>
            <input type="password" name="password" placeholder='password' onChange={handleChange}/>
            <br/>
            <button type="submit">Login</button>
            
        </form>
      </div>
     <span>Don't have an account?</span> <button style={{marginLeft:'10px',color:'blue'}} onClick={()=>setLoginEnable(false)}>Register</button>
     </>
     }
     {!loginEnable && <>
     <Register/>
          <span>Already have an account?</span> <button style={{marginLeft:'10px',color:'blue'}} onClick={()=>setLoginEnable(true)}>Login</button>

     </>}
    </div>
  )
}

export default Login
