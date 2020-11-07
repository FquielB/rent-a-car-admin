import React from 'react'
import { Input as InputData } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import './Input.css'

export default function Input({ label, placeholder, type, className="", name, rules, onChange=null, min, max }) {
    return (
        <FormItem
            className={`input ${className}`}
            label={label}
            name={name}
            rules={rules}
        >
            <InputData 
                min={min}
                max={max}
                type={type}
                placeholder={placeholder}
                onChange={onChange ? e => onChange(e.target.value) : null}
            />
        </FormItem>
    )
}
