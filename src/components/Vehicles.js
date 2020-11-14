import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Button, Image } from 'antd'
import { LinkButton } from '.'
import { useDispatch } from 'react-redux'
import { ADD_CAR_DATA } from '../actions/Actions'
import { LICENSEPLATE, BRAND, AIRPORT, MODEL, URL} from '../utils/Constants'
 
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
                                <ListGroupItem className="vehicleData">
                                    <div  className="dataSection">
                                        {   vehicle[URL]
                                            && (typeof vehicle[URL]) === 'string'
                                            && vehicle[URL].includes('https://firebasestorage.googleapis.com') 
                                            ?
                                        <Image 
                                            src={vehicle[URL]}
                                        />: <p className="noImage" >No tiene imagen</p>}
                                    </div>
                                    <div className="dataSection">
                                        <p><b>Marca</b>: {vehicle[BRAND]}</p>
                                        <p><b>Modelo</b>: {vehicle[MODEL]}</p>
                                    </div>
                                    <div  className="dataSection">    
                                        <p><b>Patente</b>: {vehicle[LICENSEPLATE]}</p>
                                        <p><b>Aeropuerto</b>: {vehicle[AIRPORT]}</p>
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
