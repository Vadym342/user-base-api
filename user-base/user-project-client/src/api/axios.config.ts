import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const axiosConfig = axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage(),
  },
});
