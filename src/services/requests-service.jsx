import { callExternalApi } from "./external-api-service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getProtectedResource = async (accessToken,parameters,method="GET") =>
{
    const config = {
        url: `${apiServerUrl}${parameters}`,
        method: method,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export const getContainerStatus = async (accessToken, specifyClient) =>
{
    // Luego agregar opciones para modificar los otros parametros
    if (specifyClient) {
        return await getProtectedResource(accessToken, `/client/status/?user_id=${specifyClient}`)
    }
    else {
        return await getProtectedResource(accessToken, `/client/status/`)
    }
    
}

export const linkContainer = async (accessToken, contID, contPassword, specifyClient) =>
{
    if (userID) {
        return await getProtectedResource(accessToken, `/cont/link/?cont_id=${contID}&password=${contPassword}&user_id=${specifyClient}`, "POST")
    }
    else {
        return await getProtectedResource(accessToken, `/cont/link/?cont_id=${contID}&password=${contPassword}`, "POST")
    }

}