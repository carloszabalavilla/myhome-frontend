import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (savedUser && sessionStorage.getItem("token")) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }
    }
    return null;
  });

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

  function updateUser(nextUser) {
    const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
