import React, { useState } from "react";
import Navbar from './components/Navbar/Navbar';
import Employees from "./components/Employees/Employees";
import Employee from "./components/Employees/Employee/Employee";
import JobTitle from "./components/Management/JobTitle/JobTitle";
import Auth from "./components/Auth/Auth";
import Schedules from "./components/ShiftSchedules/Schedules/Schedules";
import RequireAuth from "./components/Auth/RequireAuth";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import Notification from "./components/Reusable/Notification";

export default function App() {
  const [notify, setNotify] = useState({isOpen: false, message: '', type: 'success'})

  return (
    <BrowserRouter>
      <Navbar setNotify={setNotify} />
      <Routes>
        <Route path="/" element={<Layout />} >
            {/* Public routes */}
            <Route path="/auth" element={<Auth setNotify={setNotify} />} />

            {/* Protected routes */}
            <Route element={ <RequireAuth /> }>
              <Route index element={<Employees setNotify={setNotify} />} />
              <Route path="/employees/:id" element={<Employee setNotify={setNotify} />} />
              <Route path="/manage" element={<JobTitle setNotify={setNotify} />} />
              <Route path="/schedules" element={<Schedules setNotify={setNotify} />} />
            </Route>
        </Route>
      </Routes>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </BrowserRouter>
  )
}