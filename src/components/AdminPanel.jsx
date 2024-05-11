import { useState, useEffect } from "react";
import ContenedorAdmin from "./ContenedorAdmin";



const AdminPanel = () =>{
    const [containerUsers, setContainerUsers] = useState(null)
    const [usersNames, setUsersNames] = useState(null)
    const [selectedUsers, setSelectedUsers] = useState(["Fulano","Mengano"]);


    const fetchData = () => {
        //fetch(API_URL + "client/status/2")
        fetch("http://localhost:3000/api/data")
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            //Guarda en la variable containerUsers los nombres de los contenedores
            setContainerUsers(data.status.statusList.map(name => name.status.name));
            //Guarda en la variable userNames los nombres de los vigias relacionados a cada contenedor
            setUsersNames(data.status.statusList.map(field => field.clients).map(users => users.map(userName => userName.name)))
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            
          });
      }

      useEffect(() => {
        fetchData();  
      }, []);

      const addUserToList = (user) => {
        setSelectedUsers([...selectedUsers, user]);
      };
    
      const removeUserFromList = (index) => {
        setSelectedUsers(selectedUsers.filter((_, i) => i !== index));
      };

    return(
        <>
        <div className="py-32">
            <div className="flex flex-col">
            <div className=" h-auto w-1/2 m-auto p-4">
            <h2 className="text-center text-4xl font-semibold py-4">Agregar un contenedor:</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-semibold mb-2">Nombre del contenedor:</label>
                <input type="text" id="nombre" name="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="vigias" className="block text-sm font-semibold mb-2">Vigias a agregar:</label>
                {/* Asumiendo que existen usuarios */}
                <select id="vigias" name="vigias" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  {/* Usuarios disponibles */}
                </select>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Usuarios seleccionados:</label>
                  <ul>
                    {/* Renderiza los usuarios agregados hasta el momento*/}
                    {selectedUsers.map((user, index) => (
                      <li key={index} className="flex items-center justify-between py-1">
                        <span>{user}</span>
                        <button type="button" onClick={() => this.removeUserFromList(index)}>
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
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="clave" className="block text-sm font-semibold mb-2">Clave:</label>
                <input type="password" id="clave" name="clave" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enviar
              </button>
            </form>
          </div>
                <h2 className="text-center text-4xl font-semibold py-4">Lista de contenedores:</h2>
                {(usersNames === null ? <div className="text-center text-2xl">
                No se han encontrado contenedores vinculados a este usuario
              </div> : 
              <div className="space-y-4">
                {containerUsers.map((item, index) => 

                <ContenedorAdmin
                key={index}
                nombre={containerUsers[index]}
                listaDeVigias={usersNames[index]}
                >
                </ContenedorAdmin>)
                }
              </div>
              )}
            </div>
            
        </div>
        </>
    )
}

export default AdminPanel;