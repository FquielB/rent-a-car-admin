import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import './DropdownSelect.css'

export default function DropdownSelect({ data, onSelect, title, className="" }) {
    return (
        <DropdownButton 
            className={`dropdown ${className}`}
            title={title}>{
                data ? 
                data.map( value => 
                        <Dropdown.Item 
                                key={value.id}
                        >
                            {value.name}
                        </Dropdown.Item>
                    )
                :
                null
            }

        </DropdownButton>
    )
}