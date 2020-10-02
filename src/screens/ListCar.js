import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Vehicles, Footer, Input } from '../components'

import './ListCar.css'

export default function ListCar() {
    const [ vehicles , setVehicles ] = useState(null)

    useEffect(() => {
        // fetch('https://rent-a-car-uade.herokuapp.com/vehicles')
        // .then( response => {
        //     console.log(response)
        //     if(response.ok){
        //         response.json()
        //         .then( vehiclesResponse => {
        //             setVehicles(vehiclesResponse)
        //         })
        //         .catch( error => alert("Un error ha ocurrido:", error))
        //     }
        // } )
    }, [])    

    return (
        <div className="list">
            <Header title="Lista de autos" />
            <Input />
            <Vehicles vehiclesList={vehicles}/>
            <Footer />
            {/* <Link to="/editcar"> Editar auto </Link> */}
        </div>
    )
}
