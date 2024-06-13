import React, { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(loginResponse, rememberMe) {
    const user = loginResponse.user;
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("user");
    }
    sessionStorage.setItem("token", loginResponse.jwt);
    setUser(user);
 }

  function logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
