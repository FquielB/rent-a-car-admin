import axios from 'axios'

export const axiosVehicle = axios.create();

export const axiosAirport = axios.create();

axiosVehicle.interceptors.request.use(function (config) {
    const tokenValue = JSON.parse(localStorage.getItem("accessToken"));
    config.headers.Authorization = tokenValue.token;
    return config;
});

axiosVehicle.interceptors.response.use(response => {
     return response;
 }, err => {
    localStorage.clear();//SE DEBE LLAMAR AL BACK PARA VALIDAR TOKEN EN UN USE EFFECT EN APP, ACA SE DEBE HACER EL REFRESH TOKEN
//     return new Promise((resolve, reject) => {
//         const originalReq = err.config;
//         if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
//         {
//             originalReq._retry = true;

//             let res = fetch('http://localhost:8080/api/v1/auth/refresh', {
//                 method: 'POST',
//                 mode: 'cors',
//                 cache: 'no-cache',
//                 credentials: 'same-origin',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': localStorage.getItem("token")
//                 },
//                 redirect: 'follow',
//                 referrer: 'no-referrer',
//                 body: JSON.stringify({
//                     token: localStorage.getItem("token"),
//                     refresh_token: localStorage.getItem("refresh_token")
//                 }),
//             }).then(res => res.json()).then(res => {
//                 console.log(res);
//                 localStorage.setItem('tokens', res.token)
//                 originalReq.headers['Authorization'] = res.token;

//                 return axios(originalReq);
//             });


        //      resolve(res);
        //  }


//         return Promise.reject(err);
//     });
 });