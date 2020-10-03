import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input } from '../components';
import axios from 'axios'

import './ListCar.css'

export default function ListCar() {
    const [ vehicles , setVehicles ] = useState(null)

    useEffect(() => {
        axios.get('https://rent-a-car-uade.herokuapp.com/vehicles')
        .then( 
            res => {
                setVehicles(res.data.vehicles)
            })
            .catch( error => alert("Un error ha ocurrido", error))

    }, [])    

    return (
        <div className="list">
            <Header title="Lista de autos" />
            <Input 
                className="search"
                placeholder="Buscar..." />
            <Vehicles vehicles={vehicles}/>
            <Footer />
            {/* <Link to="/editcar"> Editar auto </Link> */}
        </div>
    )
}
