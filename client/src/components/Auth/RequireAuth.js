import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const [time, setItem] = useState(new Date())
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation()
  const dispatch = useDispatch()


  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
    setUser(null);
  }

  useEffect(() =>{
    if(user) {
      if(time.toISOString() >= user.expDate) {
        logout()
      }
  }
  },[time])

  return (
    user ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />
  )
}
