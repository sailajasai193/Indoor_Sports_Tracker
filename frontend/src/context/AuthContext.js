// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Track role as Admin or Student

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

