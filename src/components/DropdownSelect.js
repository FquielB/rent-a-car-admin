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
                            as="button"
                            onClick={onSelect}
                            key={value.id}
                            id={value.id}
                            value={value.name ? value.name : value.acronimo}
                        >
                            {value.name ? value.name : value.acronimo}
                        </Dropdown.Item>
                    )
                :
                null
            }

        </DropdownButton>
    )
}