import React from 'react'
import { Button } from 'react-bootstrap'
import "./Home.css"

export default function Home() {
    return (
        <div className="HomeContainer">
            <div className="Title" >
                <div className="BackgroundEllipse" />
                <div className="TitleText">
                    <h1>Rent-a-car</h1>
                    <p>Administrator App</p>
                </div>
            </div>
            <div className="Buttons">
                <Button size="lg">Ver Autos</Button>
                <Button size="lg">Agregar Autos</Button>
            </div>
        </div>
    )
}
