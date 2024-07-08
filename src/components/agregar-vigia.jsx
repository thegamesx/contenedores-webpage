// AgregarVigia.js
import React, { useState } from 'react';

const AgregarVigia = ({ onClose }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false); // State to track incorrect password

  const handleAddUser = () => {
    // Check if the password is correct
    if (password !== 'useradmin') {
      // If the password is incorrect, set the state to show the warning message
      setIsPasswordIncorrect(true);
      return;
    }

    // Add logic to handle adding the user here
    // This function will be implemented later
    // For now, we'll just close the modal
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Vigia</h2>
        {/* Warning message for incorrect password */}
        {isPasswordIncorrect && (
          <p className="text-red-500 mb-4">Contraseña incorrecta, por favor intente otra vez</p>
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          className="mb-4 p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mb-4 p-2 border rounded"
        />
        <div className="flex justify-end">
          <button onClick={handleAddUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Agregar
          </button>
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgregarVigia;
