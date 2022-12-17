import { React } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation, Outlet,
} from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import HomePage from './HomePage/HomePage';
import Nav from './Nav.jsx';
import RegisterPage from './RegisterPage/RegisterPage';
import NotFoundPage from './NotFoundPage';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { ToastifyProvider } from '../contexts/ToastifyContext';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth.loggedIn);
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const LoggedInRouter = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Navigate to="/" /> : <Outlet />;
};

const AppInit = () => (
  <ToastifyProvider>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/login" element={<LoggedInRouter />}>
              <Route path="" element={<LoginPage />} />
            </Route>
            <Route path="/signup" element={<LoggedInRouter />}>
              <Route path="" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<ChatRoute><HomePage /></ChatRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  </ToastifyProvider>
);

export default AppInit;
