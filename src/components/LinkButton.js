import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function LinkButton({ size="lg", to="/", content="", className="" }) {
    const history = useHistory();

    return (
        <Button size={size} 
            onClick={() => history.push(to)}
            className={className}>
            {content}   
        </Button>
    )
}
