
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  // Use React.useEffect instead of useEffect directly
  React.useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
