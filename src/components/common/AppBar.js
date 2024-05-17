import React from "react";
import { useUser } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
//import LoggedInAppBar from "../custom/LoggedInAppBar";
import LoggedOutAppBar from "../custom/LoggedOutAppBar";

export default function AppBar() {
  const { user } = useUser();
  const location = useLocation();
  const isLoggedIn = user !== null;

  const isNoNavPage =
    location.pathname.startsWith("/auth/") ||
    location.pathname.startsWith("/error/") ||
    location.pathname.startsWith("/user/");

  return (
    <div>
      {isNoNavPage ? null : isLoggedIn ? (
        //<LoggedInAppBar />
        null
      ) : (
        <LoggedOutAppBar />
      )}
    </div>
  );
}

