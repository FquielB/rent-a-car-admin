import React, { useState } from 'react'
import { Logo, Input } from '../components'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { useAuth } from "../context/auth";

import "./Login.css"


export default function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        const headers = { 
            'x-api-key': ''
        }
        const data = {
            username,
            password
        }
        axios.post("https://ssoia.herokuapp.com/Login", {
            headers,
            data
        }).then(result => {
          if (result.status === 200) {
            setAuthTokens(result.token);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });
      }
    
      if (isLoggedIn) {
        return <Redirect to="/" />;
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
            <Link>
                    <Button size="lg" onClick={postLogin}>
                            Login
                    </Button>
            </Link>
        </div>
    )
}
