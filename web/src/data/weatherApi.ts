import API from "./API";

export const weatherAPI = {
  searchCity,
  donnerMeteo,
  saveCity,
  selectCity,
};

export async function searchCity(city: string) {
  try {
    const response = await API.get(`/meteo/search?search=${city}`);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
export async function donnerMeteo() {
  try {
    const response = await API.get(`/meteo/donner`);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function saveCity(allCity: object) {
  try {
    const response = await API.patch(`/meteo/param`, allCity);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
export async function selectCity() {
  try {
    const response = await API.get(`/meteo/param`);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
