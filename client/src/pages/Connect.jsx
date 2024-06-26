import React, { useState } from "react";
import "./pages_css/Login.css";
import Login from "../components/Login";
import Singup from "../components/Singup";

function Connect() {
  const [userConnectionInfo, setUserConnectionInfo] = useState({
    uname: "a",
    pass: "b",
  });
  const [connectionStatus, setConnectionStatus] = useState("notConnected");
  const [userState, setUserState] = useState();
  return (
    <>
      {connectionStatus == "notConnected" && (
        <Login
          setConnectionStatus={setConnectionStatus}
          setUserConnectionInfo={setUserConnectionInfo}
        />
      )}
      {connectionStatus == "connected"}
      {connectionStatus == "newConnection" && (
        <Singup
          setConnectionStatus={setConnectionStatus}
          userConnectionInfo={userConnectionInfo}
        />
      )}
    </>
  );
}

export default Connect;
