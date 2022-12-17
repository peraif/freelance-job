/* eslint-disable react/jsx-no-constructed-context-values */
import {
  React, createContext, useContext, useState,
} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const userLog = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(userLog ? { username: userLog.username } : null);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const getUserName = () => {
    if (userLog) {
      return userLog.username;
    }
    return null;
  };

  const getAuthToken = () => {
    const currentUser = userLog;
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUserName, getAuthToken, userLog,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
