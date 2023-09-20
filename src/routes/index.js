import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router

import CafePage from '../pages/cafe';
import EmployeesPage from '../pages/employees';

const AppRouter = () => {
    return (
        <Router> {/* Wrap your entire app with the Router component */}
            <Routes>
                <Route path="/" element={<CafePage />} />
                <Route path="employees/" element={<EmployeesPage />} />
                <Route path="employees/:id" element={<EmployeesPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
