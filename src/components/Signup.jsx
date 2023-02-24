import React, { useState } from 'react'
import {TextField,Button,Snackbar, Autocomplete} from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import {Link,useNavigate} from 'react-router-dom'
import ShowMsg from './ShowMsg';

const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [snackbarMsg,setSnackbarMsg]=useState(false)
    const {signUp}=useAuthContext()
    const navigate=useNavigate()

    const signUpSubmit=async(e)=>{
        e.preventDefault()
        try{
            await signUp(email,password)
            setSnackbarMsg(false)
            navigate("/")
        }catch(err){
            console.log(err)
            setSnackbarMsg(true)
        }
    }

  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={signUpSubmit} className='signUpForm form'>
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
            >Sign Up</Button>
        </form>
        <div>
            Already have an Account ?
            <Link to='/login'>Log In</Link>
        </div>

        {snackbarMsg? <ShowMsg 
        msg={{msg:"Failed To SignUp",toShow:true}}
        setSnackbarMsg={setSnackbarMsg}
        />:null}
    </div>
  )
}

export default Signup
