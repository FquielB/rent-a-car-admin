import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Input, DropdownSelect } from './'
import axios from 'axios'

import './CarForm.css'

export default function CarForm({ carData = null, onFinish }) {
    const [ carBrand, setCarBrand ] = useState("")
    const [ carModel, setCarModel ] = useState("")
    const [ airport, setAirport ] = useState("")
    const [ doors, setDoors] = useState(0)
    const [ capacity, setCapacity ] = useState(0)
    const [ trunkCapacity, setTrunkCapacity ] = useState(0)
    const [ image, setImage ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ autonomy, setAutonomy ] = useState(0)
    const [ gearBox, setGearBox ] = useState("")
    const [ features, setFeatures ] = useState([])
    const [ price, setPrice ] = useState(0)

    const [ availableBrands, setAvailableBrands] = useState(null)
    const [ availableModels, setAvailableModels] = useState(null)
    const [ availabeAirports, setAvailableAiports ] = useState(null)

    useEffect(() => {
        axios.get('https://rent-a-car-uade.herokuapp.com/brands')
        .then( res => setAvailableBrands(res.data.brands))
        .catch( error => alert("No se han podido obtener marcas", error ))
        
        axios.get('http://itinerarios-back.herokuapp.com/itinerarios/rest/aeropuertos/')
        .then( res => setAvailableAiports(res.data))
        .catch(error => alert("No se han podido obtener los aeropuertos", error))

        if(carData)
        {
            //SETEAR TODOS LOS STATES RELACIONADOS AL AUTO
        }
    }, [])    

    const onBrandSelect = e => {
        setCarBrand(e.target.value)
        axios.get(`https://rent-a-car-uade.herokuapp.com/models/${e.target.key}`)
        .then( res => setAvailableModels(res.data.models))
        .catch( error => alert("No se han podido obtener marcas", error ))
    }

    const onModelSelect = e => {
        setCarModel(e.target.value)
    }

    const onAirportSelect = e => {
        setAirport(e.target.value)
    }

    const processForm = () =>{
        var formData = {
            vehicle: {
                airport,
                capacity,
                url: image,
                trunkCapacity,
                doors,
                brand: carBrand,
                model: carModel,
                category,
                autonomy,
                gearBox,
                active: true,
                extras: features,
                price
            }
        }
        onFinish(formData)
    }


    return (
        <Form>
            <Form.Row>
                <DropdownSelect
                    title="Selecciona un aeropuerto"
                    data={availabeAirports}
                    onSelect={onAirportSelect}
                />
                <DropdownSelect
                    title="Selecciona una marca"
                    data={availableBrands}
                    onSelect={onBrandSelect}
                />
                {carBrand !=="" ? 
                    <DropdownSelect
                        title="Selecciona un modelo"
                        data={availableModels}
                        onSelect={onModelSelect}
                    /> 
                    : null
                }
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Cantidad de puertas"
                    type="text"
                    placeholder="Ingrese..."
                    value={doors}
                    onChange={setDoors} />
                <Input 
                    label="Capacidad"
                    type="text"
                    placeholder="Ingrese..."
                    value={capacity}
                    onChange={setCapacity} />
                <Input 
                    label="??"
                    type="text"
                    placeholder="Ingrese..."
                    value={trunkCapacity}
                    onChange={setTrunkCapacity} />
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Autonomia"
                    type="text"
                    placeholder="Ingrese..."
                    value={autonomy}
                    onChange={setAutonomy} />
                <Input 
                    label="Precio"
                    type="text"
                    placeholder="Ingrese..."
                    value={price}
                    onChange={setPrice} />
            </Form.Row>
            <Form.Row>
            <Button onClick={() => processForm()}>Finalizar</Button>
            </Form.Row>
        </Form>
    )
}
