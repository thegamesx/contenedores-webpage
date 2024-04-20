import React, {  useEffect, useState } from "react";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Login from "./components/Login"

function App() {
  const [userContainerInfo, setUserContainerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_URL = "https://containerapi-9rk1ynra.b4a.run/";
  
  const fetchData = () => {
    setLoading(true); // Set loading state to true when fetching data
    setError(false); // Reset error state
  
    //fetch(API_URL + "client/status/2")
    fetch("https://localhost:3000/api/data")
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserContainerInfo(data.status.contList);
        setLoading(false); // Set loading state to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(true); // Set error state to true if there's an error
        setLoading(false); // Set loading state to false in case of error
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
        
        <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex justify-center items-center">
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
  );
  
  
  
  
}

export default App;

