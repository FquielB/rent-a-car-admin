import React from 'react'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { LinkButton } from '.'

import './Vehicles.css'

export default function Vehicles({ vehicles }) {
    return (
        <Card className="listCard">
            <ListGroup>
                {vehicles ?
                    vehicles.map(vehicle =>
                        <ListGroupItem className="vehicle" key={vehicle.id}>
                            <div>
                                <p>{vehicle.brand}</p>
                                <p>{vehicle.model}</p>
                            </div>
                            <div>
                                <LinkButton 
                                    size="sm"
                                    to='/editcar'
                                    content='Editar'
                                    className="listItemBtn"
                                />
                                <Button size="sm" className="listItemBtn">
                                    Eliminar
                                </Button>
                            </div>
                        </ListGroupItem>)
                :
                    <p>Cargando listado...</p>
                }
            </ListGroup>
        </Card>
    )
}
