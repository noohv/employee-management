import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar/Navbar';
import Employees from "./components/Employees/Employees";
import Employee from "./components/Employees/Employee/Employee";
import JobTitle from "./components/Management/JobTitle/JobTitle";
import Auth from "./components/Auth/Auth";
import Schedules from "./components/ShiftSchedules/Schedules/Schedules";
import RequireAuth from "./components/Auth/RequireAuth";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./index.css";



const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Layout />} >
                    {/* Public routes */}
                    <Route path="/auth" element={<Auth />} />

                    {/* Protected routes */}
                    <Route element={ <RequireAuth /> }>
                        <Route index element={<Employees />} />
                        <Route path="/employees/:id" element={<Employee />} />
                        <Route path="/manage" element={<JobTitle />} />
                        <Route path="/schedules" element={<Schedules />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;