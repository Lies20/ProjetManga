import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate()
  

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logOut = () => {
    navigate("/")
    
    setUser(""); 
  };

  return (
    <UserContext.Provider value={{ user, updateUser,logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
