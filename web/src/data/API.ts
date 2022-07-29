import axios from "axios";
// console.log(API_HOST, API_PORT, process.env);
export default axios.create({
  baseURL: `http://192.168.1.6:3007/`,
  headers: {
    "Content-Type": "application/json",
  },
});
