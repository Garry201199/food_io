import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuthStatus from '../../Hooks/useAuthStatus'
import LoginPage from './LoginPage'

const ProtectedRoutes = () => {
    const {loggedIn  , checkingStatus} = useAuthStatus()
    const navigate = useNavigate()
    if(checkingStatus){
      <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
    }
  return (

    loggedIn ? <Outlet/> : navigate('/login')
  )
}

export default ProtectedRoutes