import React, { useState } from 'react'
import {TextField,Button,Snackbar} from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import {Link,useNavigate} from 'react-router-dom'
import ShowMsg from './ShowMsg';

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [snackbarMsg,setSnackbarMsg]=useState(false)
    const navigate=useNavigate()
    const {login}=useAuthContext()

    const loginSubmit=async(e)=>{
        e.preventDefault()
        try{
            await login(email,password)
            setSnackbarMsg(false)
            navigate("/")
        }catch(err){
            setSnackbarMsg(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
    }
    setSnackbarMsg(false)
}


  return (
    <div>
        <h1>Log In</h1>
        <form onSubmit={loginSubmit} className='signUpForm form'>
            <TextField
                type="email"
                label='Enter Email'
                variant='outlined'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <TextField
                type="password"
                label='Enter Password'
                variant='outlined'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <Button
                type='submit'
                variant='contained'
            >Log In</Button>
            <div>
                Need an Account ?
            <Link to="/signup">Sign Up</Link>
            </div>
        </form>
        {
            snackbarMsg && <ShowMsg
            msg={{msg:"Wrong Credentials , Try Again :)",toShow:true}}
            setSnackbarMsg={setSnackbarMsg}
            />
        }
</div>
  )
  }

export default Login
