import React from 'react'
import { LinkButton, Logo } from '../components'

import "./Home.css"


export default function Home() {

    return (
        <div className="home" >
            <Logo title="Rent-a-car" subTitle="Administrator App" />
            <div className="buttons">
                <LinkButton 
                    size="lg"
                    to='/listcar'
                    content='Ver Autos'
                    className="homeBtn"
                    />
                <LinkButton 
                    size="lg"
                    to='/addcar'
                    content='Agregar Auto'
                    className="homeBtn"
                    />
            </div>
        </div>
    )
}
