import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Input } from './'

import './CarForm.css'

export default function CarForm() {
    const [ carModel, setCarModel ] = useState("")

    const onChange = e => {
        e.preventDefault()
        setCarModel(e.target.value)
    }

    return (
        <Form className="form">
            <Form.Row>
                <Input 
                    label="Modelo del Auto"
                    type="text"
                    placeholder="Ingrese el modelo..."
                    value={carModel}
                    onChange={onChange} />
                <Input 
                    label="Otro dato"
                    type="text"
                    placeholder="Ingrese..."
                    value={carModel}
                    onChange={onChange} />
            </Form.Row>
        </Form>
    )
}
