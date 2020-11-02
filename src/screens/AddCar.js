import React from 'react'
import { Header, FormData } from '../components'
import { axiosVehicle } from '../axios/AxiosInstances'
import { useHistory } from 'react-router-dom'

import './AddCar.css'

export default function AddCar() {
    const history = useHistory();


    const onFinish = carData => {
        console.log("agregado: ", carData)
        axiosVehicle.post('https://rent-a-car-uade.herokuapp.com/vehicles', carData)
        history.goBack();
    }
    
    
    return (
        <div>
            <Header title="Nuevo Auto"/>
            <FormData onFinish={onFinish} />
        </div>
    )
}
