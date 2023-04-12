import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    token: typeof window == "undefined" ? "": localStorage.getItem('token')
  }
});

