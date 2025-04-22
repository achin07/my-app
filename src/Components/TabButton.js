import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const TabButton = ({ to, icon: Icon, label }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = location.pathname === to;

    return (
        <div
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => navigate(to)}
        >
            <Icon className="tab-icon" /> 
            <span>{label}</span>
        </div>
    );
};

export default TabButton;

