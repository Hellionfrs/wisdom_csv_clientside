import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.ok) {
        setIsAuthenticated(true);
        setUsername(response.data.response.username);
        // Guardar token en el almacenamiento local si es necesario
      } else {
        // Manejar error si ok es false
        console.error('Error en la autenticación:', response.data.response);
      }
    } catch (error) {
      // Manejar error de la petición
      console.error('Error en la petición:', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/register', { email, password });
      if (response.data.ok) {
        setIsAuthenticated(true);
        setUsername(response.data.response.username);
        // Guardar token en el almacenamiento local si es necesario
      } else {
        // Manejar error si ok es false
        console.error('Error en la autenticación:', response.data.response);
      }
    } catch (error) {
      // Manejar error de la petición
      console.error('Error en la petición:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, isAuthenticated, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
