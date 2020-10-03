import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components'

export default function ListCar() {
    return (
        <div>
            <Header title="Lista de autos" />
            <Link to="/editcar"> Editar auto </Link>
        </div>
    )
}
