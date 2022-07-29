import API from "./API";
import { localTokenGet } from "../data/localStokage";

export const userApi = {
  login,
  users,
};

export async function login(email: string, password: string) {
  try {
    const response = await API.post("/connexion", {
      user: email.trim(),
      password: password.trim(),
    });
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function users() {
  const token = localTokenGet();
  const tokenLocal = `Bearer ${token.Bearer}`;
  // console.log(tokenLocal);
  try {
    const response = await API.get("/users", {
      headers: {
        Authorization: tokenLocal,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
