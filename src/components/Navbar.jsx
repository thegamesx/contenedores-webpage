import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center z-10 fixed w-full">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Nombre</h1>
      </div>
      <div className="flex items-center">
      <NavLink 
          to="/home"
          className="bg-white text-blue-700 py-2 px-4 rounded-md mr-4"
        >
          Contenedores
        </NavLink>
        <NavLink 
          to="/admin"
          className="bg-white text-blue-700 py-2 px-4 rounded-md mr-4"
        >
          Configuración
        </NavLink>
        <span className="mr-4">Bienvenido Usuario</span>
      </div>
    </nav>
  );
};

export default Navbar;
