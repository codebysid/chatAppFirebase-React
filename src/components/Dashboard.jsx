import React, { useEffect, useId, useState } from 'react'
import { doc, onSnapshot,collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { Button, getLinearProgressUtilityClass } from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import Chat from './Chat';


const Dashboard = () => {
    const [dataFromStore,setDataFromStore]=useState([])
    const [userIds,setUserIds]=useState([])
    const [chat,setChat]=useState(false)
    const [selectedUserId,setSelectedUserId]=useState('')
    const userCollectionRef=collection(db,"User")
    const {logOut,currentUser}=useAuthContext()
    const currentUserId=currentUser.uid

    const getData=async()=>{
        onSnapshot(userCollectionRef,(data)=>{
            data && data.docs.map(ele=>{
                const currentUserName=currentUser.email
                if(currentUserName!==ele.data().Username){
                    setDataFromStore(prev=>[...prev,ele.data()])
                    setUserIds(prev=>[...prev,ele.id])
                }

            })
        })

    }

    const handleLogout=async()=>{
        try{
            await logOut()
        }catch(err){
            console.log(err)
        }
    }

    const invokeChat=(key)=>{
        setSelectedUserId(userIds[key])
        setChat(true)
    }
    useEffect(()=>{
        setDataFromStore([])
        setUserIds([])
        getData()
    },[])

  return (
    <div className='userNameDivParent'>
    <div className='userNameDiv'>
      {
        dataFromStore?dataFromStore.map((ele,key)=>{
            return(
                <span 
                onClick={()=>invokeChat(key)}
                className='userNameElement' key={key}>
                    {ele.Username}
                </span>
            )
        }):null
      }

    </div>
      <Button
      variant='contained'
      type='button'
      onClick={handleLogout}
      >Log Out</Button>

      {
        chat && <Chat selectedUserId={selectedUserId}
        />
      }

      </div>
  )
}

export default Dashboard
