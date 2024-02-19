// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is logged in on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove the "user" key
    navigate("/");
  };

  const checkLoggedIn = (user) => {    
    console.log(user)
    if (!user) {
        // If user context is not available, you can return a loading state or redirect
        return <div>Loading...</div>; // Or any other loading indicator
    }
    if (user=={}){
        
        navigate("/");
    }
  };
  return (
    <UserContext.Provider value={{ user, login, logout, checkLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
