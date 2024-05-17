import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import NonAuthenticatedUser from "./components/NonAuthenticatedUser";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function App() {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [userExists, setUserExists] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated) {
        const token = await getIdTokenClaims();
        try {
          // Check if the user exists in the backend
          const accountResponse = await axios.get(`/client/account?id=${user.sub}`, {
            headers: {
              Authorization: `Bearer ${token.__raw}`
            }
          });

          if (accountResponse.data.status === "El usuario existe") {
            setUserExists(true);
            setIsAuthenticatedState(true);
          } else {
            setUserExists(false);
          }
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.error("User not authenticated:", error.response.data.detail);
            setUserExists(false);
          } else {
            console.error("Error checking or creating user:", error);
          }
        }
      }
    };

    authenticateUser();
  }, [isAuthenticated, user, getIdTokenClaims]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userExists === false) {
    return <NonAuthenticatedUser />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticatedState ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={
            isAuthenticatedState ? <HomeWithNavbar /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticatedState ? <AdminPanelWithNavbar /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function HomeWithNavbar() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

function AdminPanelWithNavbar() {
  return (
    <>
      <Navbar />
      <AdminPanel />
    </>
  );
}

export default App;
