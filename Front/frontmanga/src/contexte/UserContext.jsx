import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  

  const updateUser = (userData) => {
    console.log('Mise à jour de l\'utilisateur :', userData);
    setUser(userData);
  };

  const logOut = () => {
    console.log('Déconnexion de l\'utilisateur');
    setUser(""); 
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
