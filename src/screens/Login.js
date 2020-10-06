import React, { useState } from 'react'
import { Logo, Input } from '../components'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {  Redirect } from 'react-router-dom'
import { useAuth } from "../context/auth";

import "./Login.css"


export default function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    const referer = props.location.state.referer || '/';

    function postLogin() {
        const headers = { 
            'x-api-key': process.env.REACT_APP_API_KEY
        }
        const data = {
            username,
            password
        }

        axios.post("https://ssoia.herokuapp.com/Login", data,{
            headers
        }).then(result => {
          if (result.status === 200) {
            setAuthTokens(result.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });
      }
    
      if (isLoggedIn) {
        return <Redirect to={referer} />;
      }


    return (
        <div className="home" >
            <Logo title="Rent-a-car" subTitle="Administrator App" />
            <div className="form">
                <Input 
                    type="email" 
                    className='input' 
                    placeholder="email"
                    value={username} 
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                    />
                <Input 
                    type="password"
                    value={password} 
                    className='input' 
                    placeholder="password" 
                    onChange={e => {
                        setPassword(e.target.value);
                    }}/>
            </div>
            <Button size="lg" onClick={postLogin}>
                            Login
            </Button>
            { isError ? <p>Usuario y contraseña incorrectos</p>: null}
        </div>
    )
}
