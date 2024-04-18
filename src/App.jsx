import React, {  useEffect, useState } from "react";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Login from "./components/Login"

function App() {
  const [userContainerInfo, setUserContainerInfo] = useState([]);

  const API_URL = "http://localhost:3000/api/data";

  const fetchData = ()=>{
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setUserContainerInfo(data);
        
      })
      .catch(error => {
        console.error('Error fetcheando la data:', error);
      });
  }

  useEffect(() => {
    fetchData()  
  }, []);

  let notificationSent = false;

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones de escritorio");
      return;
    }

    // Checkea si alguna alarma esta encendida
    const hasAlarma = userContainerInfo.some((item) => item.alarma);

    // Si al menos una esta entendida, envia notificacion al escritorio
    if (hasAlarma && Notification.permission === "granted" && !notificationSent) {
      // Crea y muestra la notificacion
      new Notification("Alarma activada", {
        body: "Al menos una alarma está activada",
      });
      notificationSent = true;
    }
  }, [userContainerInfo]);

  return (
    <>
      <div className="relative">
        <Navbar fetchData={fetchData} />
        
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 pt-16">
          <div className="flex flex-col items-center space-y-4">
            {userContainerInfo.map((item, index) => (
              <Container
                key={index}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
