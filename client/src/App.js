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
                <Route path="/"  element={<Employees />} />
                <Route path="/employees/:id" element={<Employee />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;