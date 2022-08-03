import axios from "axios";

export const WS_BASE_URL = "http://i7a309.p.ssafy.io/ws/ava";
export const API_BASE_URL = "http://i7a309.p.ssafy.io/api/v1";

export let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {},
});
