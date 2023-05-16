import { Container } from '@chakra-ui/react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import Navbar from './Navbar'

const Layout = () => {
  const {user, authUser, authLoading} = useAuth();
  if (!authUser && !authLoading) {
		return <Navigate to="/login" />
	} 

  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Layout