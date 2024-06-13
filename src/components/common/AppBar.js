import React from "react";
import { useUser } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import LoggedInAppBar from "../custom/navBars/LoggedInAppBar";
import LoggedOutAppBar from "../custom/navBars/LoggedOutAppBar";

export default function AppBar() {
  const { user } = useUser();
  const location = useLocation();
  const isLoggedIn = user !== null;
  const isNoNavPage =
    location.pathname.startsWith("/auth/") ||
    location.pathname.startsWith("/error/");

  return (
    <>
      {isNoNavPage ? null : isLoggedIn ? (
        <LoggedInAppBar />
      ) : (
        <LoggedOutAppBar />
      )}
    </>
  );
}
