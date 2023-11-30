import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const navigate = useNavigate()
  

  const updateUser = (userData) => {
    console.log('Mise à jour de l\'utilisateur :', userData);
    setUser(userData);
  };

  const logOut = () => {
    console.log('Déconnexion de l\'utilisateur');
    console.log('Mise à jour de l\'utilisateur aprés la deconnexion :', user);
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
