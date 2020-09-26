import React from 'react'
import { Button } from 'react-bootstrap'
import { Logo } from '../components'

import "./Home.css"


export default function Home() {
    return (
        <div className="container">
            <Logo title="Rent-a-car" subTitle="Administrator App" />
            <div className="buttons">
                <Button size="lg">Ver Autos</Button>
                <Button size="lg">Agregar Autos</Button>
            </div>
        </div>
    )
}
