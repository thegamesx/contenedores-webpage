import React, { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (usuario !== 'user' || password !== 'password') {
      setErrorMessage('Contraseña o Usuario invalido. Intente otra vez.');
      setPassword('');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    // Remover en un futuro
    alert('Login successful!');
  };

  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <form className="w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-md p-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="usuario">
            Usuario
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="usuario"
            type="text"
            placeholder="Introduzca su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Introduzca su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Ingresar
          </button>
        </div>
        {errorMessage && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-200 text-red-700 p-1">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
