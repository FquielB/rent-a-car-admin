import React from 'react'
import { Header, FormData } from '../components'
import { axiosVehicle } from '../axios/AxiosInstances'
import { useHistory } from 'react-router-dom'

export default function EditCar() {

    const history = useHistory();

    const onFinish = carData => {
        axiosVehicle.put(`https://rent-a-car-uade.herokuapp.com/vehicles/${carData.vehicle.id}`, carData )
        .catch(error => alert("no se ha podido editar el auto", error))
        history.goBack();
    }

    return (
        <div>
            <Header title="Editar Auto"/>
            <FormData onFinish={onFinish} />
        </div>
    )
}
