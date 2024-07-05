import React, {  useEffect, useState, useCallback } from "react";
import Container from "../components/Container";
import { useAuth0 } from "@auth0/auth0-react";
import { getContainerStatus } from '../services/requests-service'
import { PageLoader } from '../components/page-loader'

function Home(){
    const [userContainerInfo, setUserContainerInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    /*
    useEffect(() =>
    {
        
        const fetchData = () =>
        {
            setLoading(true); // Setea loading en true cuando se esta fetcheando
            setError(false);
    
            fetch(API_URL + "client/status/?user_id=1") //Cambiar por el id del usuario luego
            //fetch("http://localhost:3000/api/data")
            .then(response =>
            {
                if (!response.ok) {
                    throw new Error('Error de red');
                }
                return response.json();
            })
            .then(data =>
            {
                setUserContainerInfo(data.status.statusList.map(contStatus => contStatus.status));
                setLoading(false); // Cambia el estado de loading a false cuando fetchea la data
            })
            .catch(error =>
            {
                console.error('Error fetching data:', error);
                setError(true);
                setLoading(false); // En caso de error, setea loading en false
            });
        }
    
        fetchData();  
        

        const fetchData = async () =>
        {
            setLoading(true); // Setea loading en true cuando se esta fetcheando
            setError(false);

            const accessToken = await getAccessTokenSilently();
            console.log(accessToken);

            getContainerStatus(accessToken)
            .then(data =>
            {
                //setUserContainerInfo(data.data.status.contList.map(contStatus => contStatus.status));
                setUserContainerInfo(data.data.status.contList.map(cont => cont));
                setLoading(false);
            })
            .then(error =>
            {
                console.error('Error fetching data:', error);
                setError(true);
                setLoading(false);
            })
        }

        fetchData()

    }, [getAccessTokenSilently, userContainerInfo]);
    */

    function fetchData()
    {
        let isMounted = true;

        const getContainerInfo = async () =>
        {
            const accessToken = await getAccessTokenSilently();
            const { data, error } = await getContainerStatus(accessToken);
            setLoading(true);

            if (!isMounted) {
                return;
            }

            if (data) {
                setUserContainerInfo(data.status.contList);
                setLoading(false);
            }

            if (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError(true);
            }
        };

        getContainerInfo();

        return () =>
        {
            isMounted = false;
        };
    }//, [getAccessTokenSilently]);
    /*

    NOTIFICACIONES. VER DESPUES

    let notificationSent = false;

    useEffect(() =>
    {
        if (userContainerInfo.error) {
            // Si no hay error, retorna antes de la ejecucion del resto del codigo
            console.error(userContainerInfo.error)
            return ;
        }

        if (!("Notification" in window)) {
            console.log("Este navegador no soporta notificaciones de escritorio");
            return;
        }

        // checkea si hay una alarma encendida
        const hasAlarm = userContainerInfo.data.some((item) => item.alarma);

        // Si la hay, envia una notificacion al escritorio
        if (hasAlarm && Notification.permission === "granted" && !notificationSent) {
            // crear y mostrar la notificacion
            new Notification("Alarma activada", {
                body: "Al menos una alarma está activada",
            });
            notificationSent = true;
        }
    }, [userContainerInfo]);  

    */
    useEffect(() =>
    {
        let ignore = false;

        if (!ignore) fetchData()
        return () => { ignore = true; }
    }, []);


    return(
        <>
            <div className="relative">
                <div className="min-h-screen bg-gradient-to-br  from-gray-700 to-gray-900 flex flex-col justify-center items-center">
                    <div className="centered">
                        {loading && (
                            <PageLoader />
                        )}
                        {userContainerInfo === null || undefined ? (
                            <div className={"text-white text-center text-2xl" + (loading ? " hidden" : "")}>
                                No se han encontrado contenedores vinculados a este usuario
                            </div>
                            ) : (
                                <div className="flex justify-center">
                                    {/*  Botón de actualizar. Hacer andar, y acomodarlo como corresponde*/}
                                    <div>
                                        <button onClick={fetchData} className="bg-blue-800 text-2xl font-semibold text-white mb-8 py-3 px-6 rounded-md">Actualizar</button>
                                    </div>
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