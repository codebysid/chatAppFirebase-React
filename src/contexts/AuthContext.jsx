import React, { createContext, useContext, useEffect, useState } from 'react'
import {auth} from '../Firebase'
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'
import { db } from '../Firebase'
import { collection, doc, setDoc } from "firebase/firestore"; 

const AuthContext=createContext()

export function useAuthContext(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser]=useState()

  function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password).then(async(cred)=>{
      await setDoc(doc(db, "User", cred.user.uid), {
        Username: email,
        data:{}
      });
    })
  }

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function logOut(){
    return auth.signOut()
  }
  const value={
    currentUser,login,signUp,logOut
  }

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
    })

    return unsubscribe
  },[])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
