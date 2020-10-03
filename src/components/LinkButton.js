import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function LinkButton({ size="lg", to="/", content="", className="" }) {
    return (
            <Link to={to} >
                <Button size={size} className={className} >
                    {content}   
                </Button>
            </Link>
    )
}
