import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input } from '../components';
import axios from 'axios'
import { useAuth } from '../context/auth'

import './ListCar.css'

export default function ListCar() {
    const [ vehicles , setVehicles ] = useState(null)

    const { authTokens } = useAuth();

    useEffect(() => {
        getVehicles()
    }, [])
    
    const getVehicles = () => 
    {
        const headers = {
            'Authorization': authTokens.token
        }
        axios.get('https://rent-a-car-uade.herokuapp.com/vehicles', { headers })
        .then( 
            res => {
                setVehicles(res.data.vehicles)
            })
        .catch( error => alert("Un error ha ocurrido", error))
    }

    
    const onDelete = carId => {
        const headers = {
            'Authorization': authTokens.token
        }
        console.log(headers)
        axios.delete(`https://rent-a-car-uade.herokuapp.com/vehicles/${carId}`, { headers })
        .then(alert("El auto ha sido eliminado"))
        .catch(error => alert("El auto no ha podido ser eliminado", error))
        setVehicles(null)
        getVehicles()
    }

    return (
        <div className="list">
            <Header title="Lista de autos" />
            <Input 
                className="search"
                placeholder="Buscar..." />
            <Vehicles vehicles={vehicles} onDelete={onDelete} />
            <Footer />
        </div>
    )
}
