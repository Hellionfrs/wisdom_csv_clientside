import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashBoard'


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated} = useAuth();
  return isAuthenticated ? <>{children}</> : <LoginPage />;
};

const App: React.FC = () => {

  return (
    <AuthProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
