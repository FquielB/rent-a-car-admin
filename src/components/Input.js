import React from 'react'
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap'

import './Input.css'

export default function Input({ label, placeholder, onChange, type, value, className="" }) {
    return (
        <FormGroup className={`input ${className}`} >
            <FormLabel>{label}</FormLabel>
            <FormControl 
                type={type}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                value={value}
                />
        </FormGroup>
    )
}
