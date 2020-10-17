import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import './DropdownSelect.css'

export default function DropdownSelect({ data, onSelect, title, className="", name }) {
    return (
        <DropdownButton 
            className={`dropdown ${className}`}
            title={title}>{
                data ?
                data.map ?
                    data.map( value => 
                            <Dropdown.Item 
                                name={name}
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
                :
                null
            }

        </DropdownButton>
    )
}