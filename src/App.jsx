import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeWithNavbar />} />
        <Route path="/admin" element={<AdminPanelWithNavbar />} />
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
