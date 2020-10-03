import React from 'react'
import './Header.css'

export default function Header({ title }) {
    return (
        <div className="header">
            <p>{title}</p>
        </div>
    )
}
