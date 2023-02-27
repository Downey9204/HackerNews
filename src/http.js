import axios from "axios";
console.log("http");

/** Axios Instance */
const instance = axios.create({
  baseURL: "https://api.hnpwa.com/v0/",
  headers: { "Content-Type": "application/json" },
});

/** Axios API Common Protocol */
const http = async (url, options = { method: "GET" }) => {
  const { method, headers, data } = options;
  const config = {
    url,
    method,
    headers,
    data,
  };

  try {
    const response = await instance(config);

    return response;
  } catch (err) {
    console.error("Catch Error: ", err);
  }
};

export default http;
