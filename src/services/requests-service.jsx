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
    if (specifyClient) {
        return await getProtectedResource(accessToken, '/client/status/?user_id=${specifyClient}')
    }
    else {
        return await getProtectedResource(accessToken, '/client/status/')
    }
    
}