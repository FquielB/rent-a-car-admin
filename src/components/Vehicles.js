import React from 'react'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { LinkButton } from '.'
import { useDispatch } from 'react-redux'
import { ADD_CAR_DATA } from '../actions/Actions'
 
import './Vehicles.css'

export default function Vehicles({ vehicles, onDelete }) {
    
    const dispatch = useDispatch();

    const storeCarData = vehicle => {
        dispatch({ type: ADD_CAR_DATA, payload: vehicle })
    }
    
    return (
        <Card className="listCard">
            <ListGroup>
                {vehicles ?
                    vehicles.map(vehicle => vehicle.active ? 
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
                                    onClick={() => storeCarData(vehicle)}
                                />
                                <Button size="sm" className="listItemBtn" onClick={() => onDelete(vehicle.id)} >
                                    Eliminar
                                </Button>
                            </div>
                        </ListGroupItem>
                        : null
                        )
                :
                    <p>Cargando listado...</p>
                }
            </ListGroup>
        </Card>
    )
}
