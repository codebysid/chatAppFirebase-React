import React, { useEffect, useState } from 'react'
import { doc, onSnapshot,collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { Button, getLinearProgressUtilityClass } from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
    const [dataFromStore,setDataFromStore]=useState([])
    const userCollectionRef=collection(db,"User")
    const {logOut,currentUser}=useAuthContext()

    const getData=async()=>{
        const currentUserName=currentUser.email
        const data=await getDocs(userCollectionRef)
        data && data.docs.map(ele=>{
            // console.log(ele.data())
            if(currentUserName!==ele.data().Username)setDataFromStore(prev=>[...prev,ele.data()])
        })

    }

    const handleLogout=async()=>{
        try{
            await logOut()
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        setDataFromStore([])
        getData()
    },[])

  return (
    <div className='userNameDivParent'>
    <div className='userNameDiv'>
      {
        dataFromStore?dataFromStore.map((ele,key)=>{
            return(
                <span className='userNameElement' key={key}>{ele.Username}</span>
            )
        }):null
      }

    </div>
      <Button
      variant='contained'
      type='button'
      onClick={handleLogout}
      >Log Out</Button>
      </div>
  )
}

export default Dashboard
