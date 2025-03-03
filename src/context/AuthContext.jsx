import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load from localStorage on refresh
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to log in and set the user profile
  const initUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage
    localStorage.setItem("token", token);
  };

  // Function to log out
  const exitUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, initUser, exitUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to Use Auth
export function useAuth() {
  return useContext(AuthContext);
}
