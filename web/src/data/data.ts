// /* eslint-disable react-hooks/rules-of-hooks */
// import React, { useEffect } from "react";
import { getObjectsAPI, getCacheAPI } from "./objectApi";
import { userApi } from "./userApi";
import { getUser } from "../states/userSlice";
import { setObjects, setCache } from "../states/objectSlice";
import { ConnectedObject } from "../types/ConnectedObject";

// const dispatch = useAppDispatch();
// const dispatch = useAppDispatch();
export async function getData(dispatch: Function) {
  return new Promise(async (resolve, reject) => {
    await userApi
      .users()
      .then((value) => {
        // console.log(value);
        dispatch(getUser(value.user[0]));
      })
      .catch((value) => {
        reject(value);
      });
    await getObjectsAPI().then((responses: Array<ConnectedObject>) => {
      dispatch(setObjects(responses));
    });
    await getCacheAPI().then((responses: Array<Object>) => {
      dispatch(setCache(responses));
    });
  });
}

export async function getObjects(dispatch: Function) {
  return new Promise(async (resolve, reject) => {
    await getObjectsAPI()
      .then((responses: Array<ConnectedObject>) => {
        dispatch(setObjects(responses));
      })
      .then(() => {
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
export async function getCache(dispatch: Function) {
  return new Promise(async (resolve, reject) => {
    await getCacheAPI()
      .then((responses: Array<Object>) => {
        dispatch(setCache(responses));
      })
      .then(() => {
        resolve(true);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
