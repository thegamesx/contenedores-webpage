import React, { useState, useEffect, Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import Navbar from "./components/navigation/navbar-desktop";
import Home from "./pages/home";
import AdminPanel from "./pages/admin-panel";
import Login from "./pages/login";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { AuthenticationGuard } from "./components/authentication-guard"
import "./app.css" //Revisar esto

function App() {
    const { user, isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
    const [userExists, setUserExists] = useState(null);

    if (isLoading) {
        return (
            <div className="centered">
                <PageLoader />
            </div>);
    }

    /*

    Programar esto luego. Hay que chequear si el usuario existe, y si no lo crea.

    useEffect(() => {
        const authenticateUser = async () => {
            if (isAuthenticated) {
                const token = await getIdTokenClaims();
                const accessToken = await getAccessTokenSilently();
                console.log(accessToken);
                try {
                    // Check if the user exists in the backend
                    const accountResponse = await axios.get(`/client/account?id=${user.sub}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
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
        }
        authenticateUser();
    }, [isAuthenticated, user, getIdTokenClaims, getAccessTokenSilently]);
    
    

    if (userExists === false) {
        return <NonAuthenticatedUser />;
    }
    */

    return (
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/home"
                element={<AuthenticationGuard component={ HomeWithNavbar }/>}
            />
            <Route
                path="/admin"
                element={<AuthenticationGuard component={ AdminPanelWithNavbar }/>}
            />
        </Routes>
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
