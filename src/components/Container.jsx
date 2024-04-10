import React, { useState } from 'react';

const Container = ({ temp, defrost, status, compresor, name: initialName, generalStatus }) => {
    // Nombre inicial del contenedor
    const [name, setName] = useState(initialName);
    // Estado para controlar la visibilidad de la información detallada
    const [isExpanded, setIsExpanded] = useState(false);

    // Funcion para gestionar el cambio de nombre del contenedor
    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        const regex = /^[a-zA-Z0-9&#+\s]*$/; // Regex que permite letras, numeros, el caracter # y & y espacios en blanco
        if (regex.test(inputValue) || inputValue === '') {
            setName(inputValue.slice(0, 25)); // Limitar a 25 la cantidad de caracteres
        }
    };

    // Funcion para cambiar el estado de la visibilidad de la información detallada
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Funcion para renderizar el icono y la etiqueta de error
const renderStatusIconAndLabel = () => {
    if (generalStatus === "error") {
        return (
            <div className="flex items-center mt-1 ml-4"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span className="font-bold text-red-600">ERROR</span>
            </div>
        );
    }
    return null;
};


    return (
        <div className="border-2 rounded-lg shadow-lg overflow-hidden w-full sm:w-2/5 md:w-3/10 lg:w-2/10 mt-4">
            <div className="bg-blue-700 text-white py-2 px-4">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold flex items-center">
                        Container:
                        {/* Renderizar icono y etiqueta de advertencia o error */}
                        {renderStatusIconAndLabel()}
                    </div>
                    <div className="flex items-center">
                        {/* Input para el nombre del contenedor */}
                        <input
                            type="text"
                            className="px-2 py-1 bg-gray-200 text-black rounded-md ml-2 focus:outline-none"
                            value={name}
                            onChange={handleNameChange}
                            pattern="[a-zA-Z0-9&#+\s]*"
                            title="Solo permite letras, numeros, el caracter # y & y espacios en blanco"
                            maxLength={25}
                        />
                        {/* Dropdown button para expandir o contraer la información detallada */}
                        <button onClick={toggleExpand} className="focus:outline-none ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`w-6 h-6 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mostrar la información detallada si está expandida */}
            {isExpanded && (
                <div className="flex flex-col p-4 bg-black text-white">
                    <div className="flex justify-between mb-4">
                        <span>Temperature:</span>
                        <span className={temp ? "text-green-600" : "text-red-600"}>{temp}°C</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Defrost:</span>
                        <span className={defrost ? "text-green-600" : "text-red-600"}>{defrost ? "Currently defrosting" : "Not defrosting"}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Status:</span>
                        <span className={status ? "text-green-600" : "text-red-600"}>{status ? "On" : "Off"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Compressor:</span>
                        <span className={compresor ? "text-green-600" : "text-red-600"}>{compresor ? "Working" : "Not working"}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Container;
