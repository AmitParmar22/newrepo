import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    if (!userEmail || !userPassword) {
      navigate('/login');
      return null; 
    }

    return <Component {...props} />;
  };
};

export default withAuth;
