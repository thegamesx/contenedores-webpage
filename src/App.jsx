import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import NonAuthenticatedUser from "./components/NonAuthenticatedUser";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./App.css" //Revisar esto

function App() {
    const { user, isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
    const [userExists, setUserExists] = useState(null);

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

    if (isLoading) {
        return (
            <div className="centered">
                <PageLoader />
            </div>);
    }

    if (userExists === false) {
    return <NonAuthenticatedUser />;
    }

    return (
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
