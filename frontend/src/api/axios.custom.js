import axios from "axios"
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`; // Append a semicolon for easier parsing
//   const parts = value.split(`; ${name}=`); // Split by the cookie name
//   if (parts.length === 2) return parts.pop().split(';').shift(); // Get the cookie value
// };
// document.cookie = `cardId=${getCookie("cardId")}; path=/`;

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
  });
  
// document.cookie = `cardID=${localStorage.getItem("cardId")}; path=/`;
  // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    // config.headers.Authorization = `Bearer ${localStorage.getItem("user_token")}`;

    // console.log(config);

    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response && response.data) return response.data
    return response
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance;