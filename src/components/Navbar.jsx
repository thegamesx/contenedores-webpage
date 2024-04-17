import React from 'react';

const Navbar = () => {
  return (
        <nav className="bg-blue-700 text-white p-4 flex justify-between items-center fixed w-full">
    <div className="flex items-center">
        <h1 className="text-xl font-semibold">Nombre</h1>
    </div>
    <div className="flex items-center">
        <button className="bg-gray-800 text-white py-2 px-4 rounded-md mr-4">Actualizar</button>
        <button className="bg-white text-blue-700 py-2 px-4 rounded-md mr-4">Configuración</button>
        <span className="mr-4">Bienvenido "Usuario"</span>
    </div>
    </nav>
  );
};

export default Navbar;
