import React from 'react'
import { Header, CarForm } from '../components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/auth'

import './AddCar.css'

export default function AddCar() {

    const { authTokens } = useAuth()
    const history = useHistory();


    const onFinish = carData => {
        const headers = {
            'ContentType':'application/json',
            'Authorization': authTokens.token
        }
        console.log("agregado: ", carData)
        axios.post('https://rent-a-car-uade.herokuapp.com/vehicles', carData, {
            headers
        })
        history.goBack();
    }
    
    
    return (
        <div>
            <Header title="Nuevo Auto"/>
            <CarForm onFinish={onFinish} />
        </div>
    )
}
