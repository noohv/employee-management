import React, { useState } from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function RequireRole(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation()

  return (
    user.result.role === props.role ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  )
}
