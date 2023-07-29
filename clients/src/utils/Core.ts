import axios from "axios";
import {TMDB_URL, TOKEN_TMDB} from "./Constant";

export const API = axios.create({
  baseURL: "http://localhost:5000/api"
});
export const API_IMAGE = "http://localhost:5000/media";
export const APITMBD = axios.create({
  baseURL: TMDB_URL,
  headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN_TMDB}`,
      },
});
