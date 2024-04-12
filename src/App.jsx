import Container from "./components/Container"
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
      alerta: true
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
      alerta: true
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
      alerta: false
    }
  ];
  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-600">
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
    </>
  )
}

export default App
