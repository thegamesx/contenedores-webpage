import { useState, useEffect } from "react";
import ContenedorAdmin from "./ContenedorAdmin";



const AdminPanel = () =>{
    const [containerUsers, setContainerUsers] = useState(null)
    const [usersNames, setUsersNames] = useState(null)
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


    return(
        <>
        <div className="py-32">
            <div className="">
                <h2 className="text-center text-4xl font-semibold py-4">Agregar un contenedor:</h2>
                <h2 className="text-center text-4xl font-semibold py-4">Lista de contenedores:</h2>
                {(usersNames === null ? <div className="text-center text-2xl">
                No se han encontrado contenedores vinculados a este usuario
              </div> : 
                containerUsers.map((item, index) => 
                <ContenedorAdmin
                key={index}
                nombre={containerUsers[index]}
                listaDeVigias={usersNames[index]}
                >

                </ContenedorAdmin>)
              
              )}

            </div>

        </div>
        </>
    )
}

export default AdminPanel;