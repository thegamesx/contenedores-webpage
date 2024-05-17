import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hooks

function App() {
  const { isAuthenticated, isLoading } = useAuth0(); // Check if user is authenticated
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    setIsAuthenticatedState(isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
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
