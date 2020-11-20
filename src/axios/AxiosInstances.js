import axios from 'axios'

export const axiosVehicle = axios.create({ baseURL: 'https://rent-a-car-uade.herokuapp.com' });

export const axiosAirport = axios.create({ baseURL: 'https://itinerarios-back.herokuapp.com/itinerarios' });

axiosVehicle.interceptors.request.use(function (config) {
    const tokenValue = JSON.parse(localStorage.getItem("accessToken"));
    config.headers.Authorization = tokenValue.token;
    return config;
});

axiosVehicle.interceptors.response.use(response => {
     return response;
 }, err => {
    return new Promise ((resolve, reject) => {
        const originalReq = err.config;
        if(err.response.status === 401 && err.config && !err.config.__isRetryRequest)
        {
            originalReq._retry = true;

            fetch('https://ssoia.herokuapp.com/JWT/refresh', {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem("accessToken")).token,
                    'x-api-key': process.env.REACT_APP_API_KEY
                },
                redirect: 'follow',
                referrer: 'no-referrer'
            }).then(res => res.json().then(res => {
                var newToken = JSON.stringify(res);
                newToken.includes("\"status\":500") ? localStorage.clear() : localStorage.setItem('accessToken', newToken)  
                window.location.reload();
                return axiosVehicle(originalReq);
            }))
        }
        localStorage.clear();
        window.location.reload();
        return reject(err);
    });
});