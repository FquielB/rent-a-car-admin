import { axiosVehicle, axiosAirport } from '../axios/AxiosInstances';

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


export const formatDataToForm = data => {
    var formattedDataToForm = [];
    Object.entries(data).forEach( item => {
        formattedDataToForm = formattedDataToForm.concat({
            name: [item[0]],
            value: item[1]
        })
    });
    return formattedDataToForm;
}


export const getVehicles = () => 
    new Promise (resolve => 
            axiosVehicle.get('/vehicles')
            .then( res => {
                resolve(res.data.vehicles)})
            .catch( error => console.log(error, "Recargando Pagina..."))
    );

export const deleteVehicle = id => 
    new Promise(resolve => axiosVehicle.delete(`/vehicles/${id}`)
        .then(res => {
            alert("El auto ha sido eliminado");
            resolve(res);
        })
        .catch(error => console.log(error, "Recargando Pagina..."))
    );


export const getBrands = () =>
    new Promise (resolve =>
        axiosVehicle.get('/brands')
        .then( res => resolve(res.data.brands))
        .catch( error => console.log(error, "Recargando Pagina..."))
    );

export const getAirports = () =>
    new Promise (resolve =>
        axiosAirport.get('/aeropuertos/')
        .then( res => {
            const airportsArray= [];
            res.data.forEach(airport => {
                airportsArray.push({id: airport.id, name: airport.acronimo})
            })
            resolve(airportsArray)
        })
        .catch(error => alert("No se han podido obtener los aeropuertos", error))
    );

export const getExtras = () =>
    new Promise(resolve =>
        axiosVehicle.get('/extras')
        .then(res => resolve(res.data.extras))
        .catch( error => console.log(error, "Recargando Pagina..."))
    );


export const getCategories = () =>
    new Promise(resolve => 
        axiosVehicle.get('/categories')
        .then(res => resolve(res.data.categories))
        .catch( error => console.log(error, "Recargando Pagina..."))
    );


export const getModels = id =>
    new Promise(resolve => 
        axiosVehicle.get(`/models/${id}`)
        .then( res => resolve(res.data.models))
        .catch( error => console.log(error, "Recargando Pagina..."))
    );

export const getBoxTypes = () => 
    new Promise(resolve => 
        resolve([{id: 1, name: 'automatico'},{id:2, name: 'manual'}]))


export const getReport = airport => 
    new Promise(resolve => 
        axiosVehicle.get(`/report?airport=${airport}`)
        .then(res => resolve(res))
        .catch(err => console.log(err))
    );


export const createCar = (carData, image) => 
    new Promise((resolve, reject) => {
        let carId=null;
        axiosVehicle.post('/vehicles', carData)
        .then(res => {
           if(image)
           {
                carId = res.data.id
                axiosVehicle.post(`/vehicles/images/${carId}`, image, { headers: {'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    carData.vehicle.url=res.data.fileLocation
                    axiosVehicle.put(`/vehicles/${carId}`, carData)
                    .then(res => {
                        resolve(res)})
                    .catch(error => reject(error))
                })
                .catch(error => reject(error))
            }
            else
                resolve()
        }).catch(error => reject(error));
    })

    export const updateCar = (carData, image) => 
    new Promise((resolve, reject) => {
        axiosVehicle.put(`/vehicles/${carData.vehicle.id}`, carData)
        .then(res => {
           if(image)
           {
                axiosVehicle.post(`/vehicles/images/${carData.vehicle.id}`, image, { headers: {'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    carData.vehicle.url=res.data.fileLocation
                    axiosVehicle.put(`/vehicles/${carData.vehicle.id}`, carData)
                    .then(res => resolve(res))
                    .catch(error => reject(error))
                })
                .catch(error => reject(error))
            }
            else
                resolve()
        }).catch(error => reject(error));
    })