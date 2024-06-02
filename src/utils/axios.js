import axios from 'axios';

// const jsonString = JSON.stringify(device);
const axiosClient = axios.create({
    baseURL: `/api/v1`,
});

// axiosClient.interceptors.request.use(async (config) => {

//     config.headers = {
//         ...config.headers,
//         'Content-Type': 'application/json',
//     };
//     return config;
// });

export default axiosClient;
