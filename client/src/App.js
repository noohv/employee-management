import React from "react";
import Navbar from './components/Navbar/Navbar';
import Employees from "./components/Employees/Employees";
import Employee from "./components/Employees/Employee/Employee";
import JobTitle from "./components/Management/JobTitle/JobTitle";
import Auth from "./components/Auth/Auth";
import Schedules from "./components/ShiftSchedules/Schedules/Schedules";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";


const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/"  element={<Employees />} />
                <Route path="/employees/:id" element={<Employee />} />
                <Route path="/manage" element={<JobTitle />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/schedules" element={<Schedules />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;