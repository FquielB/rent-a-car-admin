import React from 'react'
import { Header, CarForm } from '../components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { DELETE_CAR_DATA } from '../actions/Actions'
import { useDispatch } from 'react-redux'
import { headers } from '../utils/Utils'

export default function EditCar() {

    const history = useHistory();
    const dispatch = useDispatch();


    const onFinish = carData => {
        console.log("editado", carData)
        axios.put(`https://rent-a-car-uade.herokuapp.com/vehicles`, carData, { headers })
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
