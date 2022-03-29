import API from "./API";

export const userApi = {
    login
}

export async function login(email: string, password: string) {
    try {
        const response = await API.post('/users', {
            user: email.trim(),
            password: password.trim(),
        })
        return Promise.resolve(response.data)
    } catch (err) {
        return Promise.reject(err)
    }
}