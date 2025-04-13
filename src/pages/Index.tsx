
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Instead of using useNavigate hook and useEffect,
  // we'll use the Navigate component directly
  return <Navigate to="/" replace />;
};

export default Index;
