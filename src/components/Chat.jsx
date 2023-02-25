import { Button, TextField } from '@mui/material'
import { collection, onSnapshot ,doc,setDoc, getDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { db } from '../Firebase'

const Chat = ({selectedUserId}) => {
    const [showChat,setShowChat]=useState(null)
    const [msgToSend,setMsgToSend]=useState('')
    const {currentUser}=useAuthContext()
    let tmp=[]


    const docRef=doc(db,"User",currentUser.uid)

    const getData=async()=>{
        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            console.log(docSnap.data())
            if(docSnap.data().data.selectedUserId){
                setShowChat(docSnap.data().selectedUserId)
            }
            }
        }

        const sendMessage=(e)=>{
            e.preventDefault()
            let body={
                    "sentBy":currentUser.uid,
                    "msg":msgToSend
            }
            tmp.push(body)
            console.log(tmp)

            // setShowChat(prev=>
            //     prev?[
            //         {
            //         selectedUserId:[
            //             {...prev.selectedUserId},{...body}
            //         ]
            //         }
            //     ]:[{selectedUserId:[body]}]
            // )
            // [
            //     {
            //         selectedUserId:{
            //             {},{},{}
            //         }
            //     }
            // ]
        }

        const saveChanges=async()=>{
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setDoc(doc(db,"User",currentUser.uid),{
                    data:showChat
                })
            }

        }

  useEffect(()=>{
    getData()
  },[])

useEffect(()=>{
    console.dir(showChat)

    // return saveChanges
},[showChat])

  return (
    <div>
        Chat
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
            >Send</Button>
        </form>
    </div>
  )
  }

export default Chat
