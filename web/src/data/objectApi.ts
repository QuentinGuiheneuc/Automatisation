import API from "./API";

export async function getObjects() {
    try {
        const response = await API.get('/client')
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getCache() {
    try {
        const response = await API.get('/cache')
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function getExeId(idClient: number) {
    try {
        const response = await API.get(`/exe/${idClient}`)
        return Promise.resolve(response.data[0].id)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function setObject(id: number, param: string) {
    try {
        const response = await API.post(`/objetexe`, {param: param, id: id})
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}