import React, {  useEffect, useState } from "react";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Login from "./components/Login"

function App() {
  const [userContainerInfo, setUserContainerInfo] = useState(null);

  const API_URL = "https://containerapi-9rk1ynra.b4a.run/client/status/2";

  const fetchData = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setUserContainerInfo(data.status.contList);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchData();  
  }, []);

  let notificationSent = false;

  useEffect(() => {
    if (!userContainerInfo) {
      // If userContainerInfo is null, return early
      return;
    }

    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones de escritorio");
      return;
    }

    // Check if any alarm is activated
    const hasAlarm = userContainerInfo.some((item) => item.alarma);

    // If at least one alarm is activated, send notification to the desktop
    if (hasAlarm && Notification.permission === "granted" && !notificationSent) {
      // Create and show the notification
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
            {(userContainerInfo === null ?
            <div>
              Loading...
            </div>
            :
            userContainerInfo.map((item, index) => (
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
            ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

