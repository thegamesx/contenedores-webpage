import React, { useState } from 'react';
import AgregarVigia from './AgregarVigia'; // Import the AgregarVigia modal component

const ContenedorAdmin = ({ nombre, listaDeVigias }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="w-1/2 mx-auto p-6 border rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contenedor {nombre}</h2>
        <button onClick={toggleExpansion} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-6 h-6 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
            Cambiar Nombre
          </button>
          {/* Render the AgregarVigia modal component if isModalOpen is true */}
          {isModalOpen && <AgregarVigia onClose={toggleModal} />}
          <h2 className='text-2xl'>Vigias con acceso al contenedor:</h2>
          <ul>
            {listaDeVigias.map((vigia, index) => (
              <li key={index} className="flex items-center justify-between mb-4 p-2 bg-gray-100 rounded">
                <span className="text-lg">{vigia}</span>
                <button className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          {/* Button to open the modal */}
          <button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
            Agregar Vigia
          </button>
        </>
      )}
    </div>
  );
};

export default ContenedorAdmin;
