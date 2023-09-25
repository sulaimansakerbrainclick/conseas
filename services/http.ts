import axios from "axios";
import baseUrl from "@/configs/baseUrl";
import showErrorToast from "@/utils/showErrorToast";
import serverUrl from "@/configs/serverUrl";

const http = axios.create({
  baseURL: typeof window === "undefined" ? serverUrl : baseUrl,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    let isServer = typeof window === "undefined" ? true : false;

    if (isServer) {
      const fs = require("fs");

      if (fs) {
        fs.appendFile(
          "errors.txt",
          `${error?.response?.data?.message || error?.response?.data || error.message}\n`,
          function (err: any) {}
        );
      }
      //
    } else {
      showErrorToast(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export default http;
