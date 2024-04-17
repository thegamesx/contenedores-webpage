import React, { useEffect } from "react";
import Container from "./components/Container";
import Navbar from "./components/Navbar";

function App() {
  const userContainerInfo = [
    {
      displayName: "000",
      temp: -10,
      compresor: false,
      evaporacion: false,
      defrost: true,
      arranqueComp: false,
      bateria: true,
      alarma: true,
      alerta: true,
    },
    {
      displayName: "001",
      temp: -10,
      compresor: false,
      evaporacion: false,
      defrost: true,
      arranqueComp: false,
      bateria: true,
      alarma: false,
      alerta: true,
    },
    {
      displayName: "002",
      temp: -10,
      compresor: false,
      evaporacion: false,
      defrost: true,
      arranqueComp: false,
      bateria: true,
      alarma: false,
      alerta: false,
    },
  ];

  let notificationSent = false;

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notifications");
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
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 pt-16">
          <div className="flex flex-col items-center space-y-4">
            {userContainerInfo.map((item, index) => (
              <Container
                key={index}
                displayName={item.displayName}
                temp={item.temp}
                compresor={item.compresor}
                evaporacion={item.status}
                defrost={item.defrost}
                arranqueComp={item.arranqueComp}
                bateria={item.bateria}
                alarma={item.alarma}
                alerta={item.alerta}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
