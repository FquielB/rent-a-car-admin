import React from 'react'
import './Logo.css'

export default function Logo({ title, subTitle }) {
    return (
        <div className="title" >
            <div className="backgroundEllipse" />
            <div className="titleText">
                <h1>{title}</h1>
                <p>{subTitle}</p>
            </div>
        </div>
    )
}
