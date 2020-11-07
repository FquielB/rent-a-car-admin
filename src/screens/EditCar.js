import React from 'react'
import { Header, VehicleForm } from '../components'
import { updateCar } from '../utils/Functions'
import { useHistory } from 'react-router-dom'

import './EditCar.css'

export default function EditCar() {
    const history = useHistory();

    const onFinish = (carData, image) => {
        updateCar(carData, image)
        .then( res => history.goBack())
        .catch(error => alert(error))
    }

    return (
        <div>
            <Header title="Editar Auto"/>
            <VehicleForm onFinish={onFinish} />
        </div>
    )
}
