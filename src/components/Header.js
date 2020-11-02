import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { LeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import './Header.css'

export default function Header({ title, children }) {
    const history = useHistory()

    const { confirm } = Modal;
    
    const showConfirm = () => {
        confirm({
            title: '¿Querés cerrar sesion?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                localStorage.clear();
                history.replace("/login");
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }


    const goBack = () => {
        if(history.location.pathname !== '/' )
            history.goBack();
        else
        {
            showConfirm();
        }
    }

    return (
        <div className="header">
            <div className="actionButton" >
                <Button onClick={ goBack }>
                    <div className="backText" >
                        <LeftOutlined />
                        Volver
                    </div>
                </Button>
            </div>
            <p className="headerTitle">
                {title}
            </p>
            <div className="actionButton rightButton">
                {children}
            </div>
        </div>
    )
}
