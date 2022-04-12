import API from "./API";

export const weatherAPI = {
    searchCity
}

export async function searchCity(city: string) {
    try {
        const response = await API.get(`/meteo/search?search=${city}`)
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}