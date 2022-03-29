import API from "./API";

export async function getObjects() {
    try {
        const response = await API.get('/client')
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}