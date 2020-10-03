import React from 'react'
import { Header, CarForm } from '../components'

import './AddCar.css'

export default function AddCar() {
    return (
        <div>
            <Header title="Nuevo Auto"/>
            <CarForm />
        </div>
    )
}
