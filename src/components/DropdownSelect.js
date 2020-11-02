import React from 'react'
import { Select } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import './DropdownSelect.css'


export default function DropdownSelect({ data, label, className="", name, placeholder, rules, onChange, mode=null }) {
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
            >
                {
                    data ? 
                        data.map( (value, index) => {
                                    if(value.id)
                                        return <Option key={index} value={value.name}>
                                                {value.name}
                                            </Option>
                                    else
                                        return <Option key={index} value={value}>
                                                    {value}
                                                </Option>
                                }
                            )
                        : null
                }
            </Select>
        </FormItem>
    )
}