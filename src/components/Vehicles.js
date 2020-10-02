import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

import './Vehicles.css'

export default function Vehicles({ vehiclesList }) {
    return (
        <Card className="listCard">
            <ListGroup>
                {vehiclesList ?
                    vehiclesList.vehicles.map(vehicle =>
                        <ListGroupItem className={"vehicle"} key={vehicle.id}>
                            <p>{vehicle.brand}</p>
                            <p>{vehicle.model}</p>
                        </ListGroupItem>)
                :
                    <p>Cargando listado...</p>
                }
            </ListGroup>
        </Card>
    )
}
