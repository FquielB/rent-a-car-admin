import React from 'react'
import { LinkButton, Logo } from '../components'
import { Button } from 'react-bootstrap'
import { useAuth } from "../context/auth";

import "./Home.css"


export default function Home() {
    const { setAuthTokens } = useAuth();

    function logOut() {
      setAuthTokens();
      localStorage.removeItem('tokens');
    }
  
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
                <Button size="lg" onClick={logOut}>
                            Logout
                </Button>
            </div>
        </div>
    )
}
