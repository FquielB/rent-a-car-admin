import React from 'react'
import { Button } from 'react-bootstrap'
import { Logo } from '../components'
import { Link } from 'react-router-dom'

import "./Home.css"


export default function Home() {

    return (
        <div className="home" >
            <Logo title="Rent-a-car" subTitle="Administrator App" />
            <div className="buttons">
                <Link to="/listcar">
                    <Button size="lg">
                            Ver Autos   
                    </Button>
                </Link>
                <Link to="/addcar">
                    <Button size="lg">
                            Agregar Autos
                    </Button>
                </Link>
            </div>
        </div>
    )
}
