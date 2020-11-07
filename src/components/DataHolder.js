import React from 'react';
import { Card } from 'antd';

import './DataHolder.css'

export default function DataHolder({ children, className }) {
    return (
        <div className={`formCard ${className}`}>
            <Card>
                {children}
            </Card>
        </div>
    )
}

