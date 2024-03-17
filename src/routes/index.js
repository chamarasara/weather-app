import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Weather from '../pages/weather';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
