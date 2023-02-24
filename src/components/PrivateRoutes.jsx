import React from 'react'
import{Route,Navigate,Outlet} from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const PrivateRoutes = () => {
    const {currentUser}=useAuthContext()


  return (
    <>
   {currentUser?<Outlet/>:<Navigate to={'/login'}/>}
   </>
  )
}

export default PrivateRoutes
