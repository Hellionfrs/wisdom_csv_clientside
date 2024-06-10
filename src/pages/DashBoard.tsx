import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { username } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl">Bienvenido, {username}!</h1>
    </div>
  );
};

export default DashboardPage;
