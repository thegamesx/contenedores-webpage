import Container from "./components/Container"
function App() {

  const userContainerInfo = [
    {
      name: "000",
      generalStatus: "Ok",
      temp: -10,
      defrost: true,
      compresor: false,
      status: true
    },
    {
      name: "001",
      generalStatus: "error",
      temp: -15,
      defrost: false,
      compresor: true,
      status: false
    },
    {
      name: "002",
      generalStatus: "error",
      temp: -8,
      defrost: true,
      compresor: true,
      status: true
    },
    {
      name: "003",
      generalStatus: "Ok",
      temp: -20,
      defrost: false,
      compresor: false,
      status: true
    },
    {
      name: "004",
      generalStatus: "error",
      temp: -12,
      defrost: true,
      compresor: false,
      status: false
    }
  ];
  

  return (
    <>
      <div className="flex flex-col items-center space-y-4">
            {userContainerInfo.map((item, index) => (
                <Container
                    key={index}
                    generalStatus={item.generalStatus}
                    name={item.name}
                    temp={item.temp}
                    defrost={item.defrost}
                    status={item.status}
                    compresor={item.compresor}
                />
            ))}
        </div>
    </>
  )
}

export default App
