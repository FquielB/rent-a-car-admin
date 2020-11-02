import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button } from 'antd'
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
        <div className="listCard" >
            <Card>
                <ListGroup>
                    {vehicles ?
                        vehicles.map((vehicle, index) => vehicle.active ? 
                            <div className="vehicle" key={index}>
                                <ListGroupItem>
                                    <div>
                                        <p>{vehicle.brand}</p>
                                        <p>{vehicle.model}</p>
                                    </div>
                                    <div className="listItemBtn" >
                                        <LinkButton 
                                            size="sm"
                                            to='/editcar'
                                            onClick={() => storeCarData(vehicle)}
                                        >
                                            Editar
                                        </LinkButton>
                                        <Button size="sm" onClick={() => onDelete(vehicle.id)} >
                                            Eliminar
                                        </Button>
                                    </div>
                                </ListGroupItem>
                            </div>
                            : null
                            )
                    :
                        <p>Cargando listado...</p>
                    }
                </ListGroup>
            </Card>
        </div>
    )
}
