import React, { useState } from 'react';

const Container = ({ displayName, temp, compresor, evaporacion, defrost, arranqueComp, bateria, alarma, alerta }) => {
    // Nombre inicial del contenedor
    const [name, setName] = useState(displayName);
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
    if (alarma === true) {
        return (
            <div className="flex items-center mt-1 ml-4"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EF4444" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span className="font-bold text-red-600">ERROR</span>
            </div>
        );
    } else if(alerta === true){
        return(
            <div className="flex items-center mt-1 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F59E0B" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <span className="font-semibold text-yellow-500">WARNING</span>
            </div>
        )
    }
    return null;
};


    return (
        <div className="rounded-lg shadow-lg overflow-hidden w-full sm:w-2/5 md:w-3/10 lg:w-2/10 mt-4">
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
                <div className="flex flex-col p-4 font-mono bg-black text-white">
                    <div className="flex justify-between mb-4">
                        <span>Temperatura:</span>
                        <span className={temp ? "text-green-600" : "text-red-600"}>{temp}°C</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Defrost:</span>
                        <span className={defrost ? "text-green-600" : "text-red-600"}>{defrost ? "Currently defrosting" : "Not defrosting"}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Compresor:</span>
                        <span className={compresor ? "text-green-600" : "text-red-600"}>{compresor ? "Working" : "Not working"}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Evaporacion:</span>
                        <span className={evaporacion ? "text-green-600" : "text-red-600"}>{evaporacion ? "On" : "Off"}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Arranque Componente?:</span>
                        <span className={arranqueComp ? "text-green-600" : "text-red-600"}>{arranqueComp ? "On" : "Off"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Bateria:</span>
                        <span className={bateria ? "text-green-600" : "text-red-600"}>{bateria ? "On" : "Off"}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Container;
