import axios from "axios";
import { API_BASE_URL } from "./url";

export let axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {},
});
