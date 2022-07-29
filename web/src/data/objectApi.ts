import API from "./API";

export async function getObjectsAPI() {
  try {
    const response = await API.get("/client");
    if (response.status !== 200) {
      return Promise.reject(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
export async function getObjects() {
  try {
    const response = await API.get("/client");
    if (response.status !== 200) {
      return Promise.reject(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
export async function getCacheAPI() {
  try {
    const response = await API.get("/cache");
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getExeId(idClient: number) {
  try {
    const response = await API.get(`/exe/${idClient}`);
    return Promise.resolve(response.data[0].id);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function setObject(id: number, param: any) {
  try {
    const response = await API.post(`/objetexe`, {
      param: JSON.stringify(param),
      id: id,
    });
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
