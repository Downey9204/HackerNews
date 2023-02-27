import axios from "axios";
console.log("http");

/** Axios Instance */
const instance = axios.create({
  baseURL: "https://api.hnpwa.com/v0/",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    console.log("isLoading", true);
    return config;
  },
  (error) => {
    console.log("----- Request Error -----");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("----- Response Error -----");
    return Promise.reject(error);
  }
);

/** Axios API Common Protocol Explicitly */
// const http = async (url, options = { method: "GET" }) => {
//   const { method, headers, data } = options;
//   const config = {
//     url,
//     method,
//     headers,
//     data,
//   };

//   try {
//     const response = await instance(config);

//     return response;
//   } catch (error) {
//     console.log("------ Catch Error ----------");
//     console.error(error);
//     console.log("-----------------------------\n");
//   } finally {
//     console.log("hide Loading");
//   }
// };

export default instance;
