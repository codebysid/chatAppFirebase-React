import React, { useEffect, useState } from 'react'
import { doc, onSnapshot,collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import { Button, getLinearProgressUtilityClass } from '@mui/material';
import { useAuthContext } from '../contexts/AuthContext';
import Chat from './Chat';


const Dashboard = () => {
    const [dataFromStore,setDataFromStore]=useState([])
    const [userIds,setUserIds]=useState([])
    const [chat,setChat]=useState(false)
    const [selectedUserId,setSelectedUserId]=useState([])
    const [showChat,setShowChat]=useState([])

    const userCollectionRef=collection(db,"User")
    const {logOut,currentUser}=useAuthContext()

    const getData=async()=>{
        onSnapshot(userCollectionRef,(data)=>{
            data && data.docs.map(ele=>{
                if(currentUser.email!==ele.data().Username){
                    setDataFromStore(prev=>prev?new Set([...prev,ele.data()]):new Set([ele.data()]))
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
    
    useEffect(()=>{
        setShowChat([])
    },[selectedUserId])

  return (
    <div className='userNameDivParent'>
    <div className='userNameDiv'>
      {
        
        dataFromStore?Array.from(dataFromStore).map((ele,key)=>{
            return(
                <span 
                onClick={()=>invokeChat(key)}
                className='userNameElement' key={key}>
                    {ele.Username}
                </span>
            )
        }):null
      }

      <Button
      variant='contained'
      type='button'
      onClick={handleLogout}
      >Log Out</Button>

      </div>
        {
            chat && <Chat selectedUserId={selectedUserId}
            showChat={showChat}
            setShowChat={setShowChat}
            />
        }

      </div>
  )
}

export default Dashboard
