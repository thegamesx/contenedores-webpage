import React, {  useEffect, useState } from "react";
import Container from "./Container";

function Home(){
  const [userContainerInfo, setUserContainerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = "https://containerapi-9rk1ynra.b4a.run/";
  
  const fetchData = () => {
    setLoading(true); // Setea loading en true cuando se esta fetcheando
    setError(false); 
    
    //fetch(API_URL + "client/status/2")
    fetch("http://localhost:3000/api/data")
    .then(response => {
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json();
      })
      .then(data => {
        setUserContainerInfo(data.status.statusList.map(contStatus => contStatus.status));
        setLoading(false); // Cambia el estado de loading a false cuando fetchea la data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(true); 
        setLoading(false); // En caso de error, setea loading en false
      });
  }
  

  useEffect(() => {
    fetchData();  
  }, []);

  let notificationSent = false;

  useEffect(() => {
    if (!userContainerInfo) {
      // Si no hay error, retorna antes de la ejecucion del resto del codigo
      return;
    }

    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones de escritorio");
      return;
    }

    // checkea si hay una alarma encendida
    const hasAlarm = userContainerInfo.some((item) => item.alarma);

    // Si la hay, envia una notificacion al escritorio
    if (hasAlarm && Notification.permission === "granted" && !notificationSent) {
      // crear y mostrar la notificacion
      new Notification("Alarma activada", {
        body: "Al menos una alarma está activada",
      });
      notificationSent = true;
    }
  }, [userContainerInfo]);  

    return(
        <>
            <div className="relative">
            
              <div className="min-h-screen bg-gradient-to-br  from-gray-700 to-gray-900 flex flex-col justify-center items-center">
                <div className="flex justify-center">
                  <button onClick={fetchData} className="bg-blue-800 text-2xl font-semibold text-white mb-8 py-3 px-6 rounded-md">Actualizar</button>
                </div>
                <div className="max-w-screen-xl w-full px-4">
                    {loading && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-200"></div>
                    </div>
                    )}
                    {userContainerInfo === null ? (
                    <div className={"text-white text-center text-2xl" + (loading ? " hidden" : "")}>
                        No se han encontrado contenedores vinculados a este usuario
                    </div>
                    ) : (
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 gap-4 w-full">
                        {/*Se mapea la informacion de los contenedores*/}
                        {userContainerInfo.map((item, index) => (
                            <div key={index} className="flex justify-center">
                            <Container
                                displayName={item.name}
                                temp={item.temp}
                                compresor={item.compresor}
                                evaporacion={item.status}
                                defrost={item.defrost}
                                arranque_comp={item.arranque_comp}
                                bateria={item.bateria}
                                alarma={item.alarma}
                                defrost_status={item.defrost_status}
                            />
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>
              </div>
        </div>
        </>
    )
}

export default Home;