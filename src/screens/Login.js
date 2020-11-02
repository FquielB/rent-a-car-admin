import React, { useState } from 'react'
import { Logo, Input } from '../components'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fieldValidations } from '../utils/Constants';

import "./Login.css"


export default function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const referer = props.location.state ? props.location.state.referer || '/' : '/';

    function postLogin( data ) {
        setIsLoading(true);
        const headers = { 
            'x-api-key': process.env.REACT_APP_API_KEY
        }
        axios.post("https://ssoia.herokuapp.com/Login", data,{
            headers
        }).then(result => {
          setIsLoading(false);
          if (result.status === 200) {
            localStorage.setItem('accessToken', JSON.stringify(result.data))
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsLoading(false)
          setIsError(true);
        });
      }
    
    if (isLoggedIn) {
      return <Redirect to={referer} />;
    }


    return (
        <div className="home" >
            <Logo title="Rent-a-car" subTitle="Administrator App" />
            <Form 
              className="form"
              onFinish={postLogin}
              validateMessages={fieldValidations}
            >
              <Input 
                name="username"
                className='inputLogin' 
                placeholder="Ingrese su email"
                rules={[{
                  required: true
                }]}
              />
              <Input 
                type="password"
                name="password"
                className='inputLogin' 
                placeholder="Ingrese su password"
                rules={[{
                  required: true
                }]}
              />
              <Button size="lg" htmlType="submit" className="button">
                              {isLoading ? <LoadingOutlined /> : <p>Login</p>}
              </Button>
            </Form>
            {isError ? <p className="errorMsg" >
                          Credenciales inválidas!
                        </p> 
                      : 
                        null}
        </div>
    )
}
