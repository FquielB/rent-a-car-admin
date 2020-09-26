import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'

import './Input.css'

export default function Input({ label, placeholder, onChange, type, value }) {
    return (
        <FormGroup className="input">
            <FormLabel>{label}</FormLabel>
            <FormControl 
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                />
        </FormGroup>
    )
}
