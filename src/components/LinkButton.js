import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export default function LinkButton({ size="lg", to="/", children, className="", onClick }) {
    const history = useHistory();

    return (
        <Button size={size} 
            onClick={() => { 
                history.push(to)
                if(onClick)
                    onClick()
            }}
            className={className}
        >
            {children}   
        </Button>
    )
}
