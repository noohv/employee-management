import React from "react";
import Navbar from './components/Navbar/Navbar';
import Employees from "./components/Employees/Employees";
import Employee from "./components/Employees/Employee/Employee";
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";


const App = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/"  element={<Employees />} />
                <Route exact path="/employees/:employeeId" element={<Employee />} />
                <Route exact path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;