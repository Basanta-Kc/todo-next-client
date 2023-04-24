import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    token: typeof window == "undefined" ? "" : localStorage.getItem("token"),
  },
});

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      window.location.href = "/login";
    }
    console.log(error.response)
    error.message = error.response.data.message ?? "Something Went Wrong."
    return Promise.reject(error);
  }
);
