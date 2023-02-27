import { Button, TextField } from '@mui/material'
import { collection, onSnapshot ,doc,setDoc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import React, { createContext, useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { db } from '../Firebase'
import { v4 as uuidv4 } from 'uuid';

const Chat = ({selectedUserId,showChat,setShowChat}) => {
    const [msgToSend,setMsgToSend]=useState('')
    const {currentUser}=useAuthContext()

    const combinedId=currentUser.uid>selectedUserId?currentUser.uid+selectedUserId:selectedUserId+currentUser.uid

    const createChat=async()=>{

        try{
            const res=await getDoc(doc(db,"chat",combinedId))

            if(res.exists()){

            }else{
                await setDoc(doc(db,"chat",combinedId),{
                    messages:[]
                })
            }
        }catch(err){
            console.log({err})
        }
    }

    const sendMessage=async(e)=>{
        e.preventDefault()
        setMsgToSend("")
        let tmp={
            msg:msgToSend,
            sentBy:currentUser.uid,
            id:uuidv4()
        }
        try{
            await updateDoc(doc(db,"chat",combinedId),{
                messages:arrayUnion(tmp),
            })
            
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        createChat()
        const unSub=onSnapshot(doc(db,"chat",combinedId),doc=>{
            setShowChat(doc.data().messages)
        })

        return unSub
    },[selectedUserId])
  return (
    <div className='ChatDiv'>
        <div className="displayMsg">
            {
            showChat && showChat.map((ele,key)=>{
                return(
                    <p key={key} className={ele.sentBy===currentUser.uid?"right":"left"}>{ele.msg}
                    </p>
                )
            })
        }
        </div>
        <form onSubmit={sendMessage}>
            <TextField
                type='text'
                label='Enter Message'
                variant='outlined'
                value={msgToSend}
                onChange={(e)=>setMsgToSend(e.target.value)}
                required
            />
            <Button
            variant='contained'
            type='submit'
            >
                Send
            </Button>
        </form>
    </div>
  )
  }

export default Chat
