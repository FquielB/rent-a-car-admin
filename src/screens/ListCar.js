import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input } from '../components';
import axios from 'axios'
import { headers } from '../utils/Utils'

import './ListCar.css'

export default function ListCar() {
    const [ vehicles , setVehicles ] = useState(null)

    useEffect(() => {
        getVehicles()
    }, [])
    
    const getVehicles = () => 
    {
        axios.get('https://rent-a-car-uade.herokuapp.com/vehicles')
        .then( 
            res => {
                setVehicles(res.data.vehicles)
            })
        .catch( error => alert("Un error ha ocurrido", error))
    }
    const onDelete = carId => {
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
