import React from 'react'
import { Select } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import './DropdownSelect.css'


export default function DropdownSelect({ data, label, className="", name, placeholder, rules, onChange, mode=null, defaultValue, value }) {
    const { Option } = Select;

    return (
        <FormItem
            className={`dropdown ${className}`}
            name={name}
            label={label}
            rules={rules}
        >
            <Select 
                mode={mode}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
            >
                {
                    data ? 
                        data.map( (value, index) => {
                                    return <Option key={index} value={value.name}>
                                            {value.name}
                                        </Option>
                                }
                            )
                        : null
                }
            </Select>
        </FormItem>
    )
}