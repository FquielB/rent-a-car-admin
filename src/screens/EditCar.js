import React from 'react'
import { Header, CarForm } from '../components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { DELETE_CAR_DATA } from '../actions/Actions'
import { useDispatch } from 'react-redux'
import { useAuth } from '../context/auth'

export default function EditCar() {

    const history = useHistory();
    const dispatch = useDispatch();

    const  { authTokens } = useAuth();

    const onFinish = carData => {
        const headers = {
            'Authorization': authTokens.token
        }
        console.log(carData, carData.vehicle.id)
        axios.put(`https://rent-a-car-uade.herokuapp.com/vehicles/${carData.vehicle.id}`, carData , { headers })
        .catch(error => alert("no se ha podido editar el auto", error))
        dispatch({ type: DELETE_CAR_DATA })
        history.goBack();
    }

    return (
        <div>
            <Header title="Editar Auto"/>
            <CarForm onFinish={onFinish} />
        </div>
    )
}
