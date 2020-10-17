import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'

import './Input.css'

export default function Input({ label, placeholder, onChange, type, value, className="", name }) {
    return (
        <FormGroup className={`input ${className}`} >
            <FormLabel>{label}</FormLabel>
            <FormControl 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                />
        </FormGroup>
    )
}
