import React from 'react'
import { Header, CarForm } from '../components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './AddCar.css'

export default function AddCar() {
    
    const history = useHistory();

    const onFinish = carData => {
        console.log("agregado: ", carData)
        axios.post('https://rent-a-car-uade.herokuapp.com/vehicles', carData)
        history.goBack();
    }
    
    
    return (
        <div>
            <Header title="Nuevo Auto"/>
            <CarForm onFinish={onFinish} />
        </div>
    )
}
