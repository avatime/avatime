import axios from "axios";

export const WS_BASE_URL = "http://localhost:8080/ws/ava";
export const API_BASE_URL = "http://localhost:8080/api/v1";

export let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {},
});
