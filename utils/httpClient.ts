import axios from "axios";

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    token: typeof window == "undefined" ? "": localStorage.getItem('token')
  }
});

httpClient.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401 && typeof window !== 'undefined') {
    window.location.href = '/login';
    localStorage.removeItem("token")
  }
});

