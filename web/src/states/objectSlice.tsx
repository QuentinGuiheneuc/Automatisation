import { createSlice } from "@reduxjs/toolkit";

import { ConnectedObject } from "../types/ConnectedObject";
import { Cache } from "../types/Cache";
import { getCacheAPI } from "../data/objectApi";

const getLights = (lights: Array<ConnectedObject>) => {
  return lights.filter((element: ConnectedObject) => {
    return (
      element.topic === "eleclairage" ||
      element.topic.substring(0, element.topic.indexOf("/")) === "wled"
    );
  });
};

const getOutlets = (lights: Array<ConnectedObject>) => {
  return lights.filter((element: ConnectedObject) => {
    return element.topic === "prise";
  });
};

const getRadiators = (lights: Array<ConnectedObject>) => {
  return lights.filter((element: ConnectedObject) => {
    return element.topic === "radiateur";
  });
};
const getCacheV = async () => {
  const cache = await getCacheAPI();
  return cache.responses;
  //   return getCache().then((responses: Array<Cache>) => {
  //     return responses;
  //   });
};

export const objectSlice = createSlice({
  name: "object",
  initialState: {
    lights: Array<ConnectedObject>(),
    outlets: Array<ConnectedObject>(),
    radiators: Array<ConnectedObject>(),
    cache: Array<Cache>(),
  },
  reducers: {
    setObjects: (state, action) => {
      state.lights = getLights(action.payload);
      state.outlets = getOutlets(action.payload);
      state.radiators = getRadiators(action.payload);
    },
    setLights: (state, action) => {
      state.lights = getLights(action.payload);
    },
    setOutlets: (state, action) => {
      state.outlets = getOutlets(action.payload);
    },
    setRadiator: (state, action) => {
      state.radiators = getRadiators(action.payload);
    },
    setCache: (state, action) => {
      state.cache = action.payload;
    },
  },
});

export const { setObjects, setLights, setOutlets, setRadiator, setCache } =
  objectSlice.actions;
export default objectSlice.reducer;
