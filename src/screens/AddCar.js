import React from 'react'
import { Header, VehicleForm } from '../components'
import { createCar } from '../utils/Functions'
import { useHistory } from 'react-router-dom'

import './AddCar.css'

export default function AddCar() {
    const history = useHistory();


    const onFinish = (carData, image) => {
        createCar(carData, image)
        .then(res => history.goBack())
        .catch(error => alert(error))   
    }
    
    
    return (
        <div>
            <Header title="Nuevo Auto"/>
            <VehicleForm onFinish={onFinish} />
        </div>
    )
}
