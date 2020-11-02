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
            axiosVehicle.get('https://rent-a-car-uade.herokuapp.com/vehicles')
            .then( res => resolve(res.data.vehicles))
            .catch( error => alert("Un error ha ocurrido", error))
    );

export const deleteVehicle = id => 
    new Promise(resolve => axiosVehicle.delete(`https://rent-a-car-uade.herokuapp.com/vehicles/${id}`)
        .then(res => {
            alert("El auto ha sido eliminado");
            resolve(res);
        })
        .catch(error => alert("El auto no ha podido ser eliminado", error))
    );


export const getBrands = () =>
    new Promise (resolve =>
        axiosVehicle.get('https://rent-a-car-uade.herokuapp.com/brands')
        .then( res => resolve(res.data.brands))
        .catch( error => alert("No se han podido obtener marcas", error ))
    );

export const getAirports = () =>
    new Promise (resolve =>
        axiosAirport.get('https://itinerarios-back.herokuapp.com/itinerarios/rest/aeropuertos/')
        .then( res => resolve(res.data))
        .catch(error => alert("No se han podido obtener los aeropuertos", error))
    );

export const getExtras = () =>
    new Promise(resolve =>
        axiosVehicle.get('https://rent-a-car-uade.herokuapp.com/extras')
        .then(res => resolve(res.data.extras))
        .catch( error => alert("No se han podido obtener las categorias", error))
    );


export const getCategories = () =>
    new Promise(resolve => 
        axiosVehicle.get('https://rent-a-car-uade.herokuapp.com/categories')
        .then(res => resolve(res.data.categories))
        .catch( error => alert("No se han podido obtener las categorias", error))
    );


export const getModels = id =>
    new Promise(resolve => 
        axiosVehicle.get(`https://rent-a-car-uade.herokuapp.com/models/${id}`)
        .then( res => resolve(res.data.models))
        .catch( error => alert("No se han podido obtener marcas", error ))
    );