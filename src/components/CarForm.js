import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import { Input, DropdownSelect } from './'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toBase64 } from '../utils/Utils'
import { useAuth } from '../context/auth'

import './CarForm.css'

export default function CarForm({ onFinish }) {
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
    const [ singleFeature, setSingleFeature ] = useState("")
    const [ features, setFeatures ] = useState([])
    const [ price, setPrice ] = useState(0)
    const [ id, setId ] = useState("")

    const [ availableBrands, setAvailableBrands] = useState(null)
    const [ availableModels, setAvailableModels] = useState(null)
    const [ availableAirports, setAvailableAiports ] = useState(null)
    const [ availableCategories, setAvailableCategories ] = useState(null)

    const carData = useSelector( state => state )
    const fileRef = useRef()
    const { authTokens } = useAuth();

    useEffect(() => {

        const headers = {
            'Authorization': authTokens.token
        }

        axios.get('https://rent-a-car-uade.herokuapp.com/brands', { headers })
        .then( res => setAvailableBrands(res.data.brands))
        .catch( error => alert("No se han podido obtener marcas", error ))
        
        axios.get('https://itinerarios-back.herokuapp.com/itinerarios/rest/aeropuertos/')
        .then( res => setAvailableAiports(res.data))
        .catch(error => alert("No se han podido obtener los aeropuertos", error))

        axios.get('https://rent-a-car-uade.herokuapp.com/categories', { headers })
        .then(res => setAvailableCategories(res.data.categories))
        .catch( error => alert("No se han podido obtener las categorias", error))

        if(carData && carData.active && carData.id)
        {
            setTrunkCapacity(carData.trunkCapacity)
            setPrice(carData.price)
            setAutonomy(carData.autonomy)
            setAirport(carData.airport)
            setImage(carData.url)
            setGearBox(carData.gearBox)
            setFeatures(carData.extras)
            setCarModel(carData.model)
            setCarBrand(carData.brand)
            setDoors(carData.doors)
            setCategory(carData.category)
            setCapacity(carData.capacity)
            setId(carData.id)
        }
    }, [carData, authTokens])    

    const onBrandSelect = e => {
        const headers = {
            'Authorization': authTokens.token
        }
        e.preventDefault()
        setCarModel("")
        setCarBrand(e.target.value)
        axios.get(`https://rent-a-car-uade.herokuapp.com/models/${e.target.id}`, { headers })
        .then( res => setAvailableModels(res.data.models))
        .catch( error => alert("No se han podido obtener marcas", error ))
    }

    const onModelSelect = e => {
        e.preventDefault()
        setCarModel(e.target.value)
    }

    const onAirportSelect = e => {
        e.preventDefault()
        setAirport(e.target.value)
    }

    const onGearBoxSelect = e => {
        e.preventDefault()
        setGearBox(e.target.value)
    }

    const processForm = () =>{
        var formData = {}
        if( id !== "")
            formData = {
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
                    price,
                    id
                }
            }
        else
            formData = {
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
        emptyFields()
    }

    const emptyFields = () =>{
        setTrunkCapacity(0)
            setAutonomy(0)
            setAirport("")
            setImage("")
            setGearBox("")
            setFeatures([])
            setCarModel("")
            setCarBrand("")
            setDoors(0)
            setCategory("")
            setCapacity(0)
            setId(0)
            setPrice(0)
    }

    const addFeature = () => {
        setFeatures(features.concat(singleFeature))
        setSingleFeature("")
    }

    const processImage = e => {
        e.preventDefault()
        const files = Array.from(e.target.files)
        toBase64(files[0]).then(processedFile => setImage(files[0].name))
    }

    return (
        <Form>
            <Form.Row>
                <DropdownSelect
                    className="dropdownSelect"
                    title={airport === "" ? "Selecciona un aeropuerto" : airport}
                    data={availableAirports}
                    onSelect={onAirportSelect}
                />
                <DropdownSelect
                    className="dropdownSelect"
                    title={carBrand === "" ? "Selecciona una marca" : carBrand}
                    data={availableBrands}
                    onSelect={onBrandSelect}
                />
                <DropdownSelect
                        className="dropdownSelect"
                        title={carModel === "" ? "Seleccione un modelo" : carModel}
                        data={availableModels}
                        onSelect={onModelSelect}
                    /> 
                <DropdownSelect
                    className="dropdownSelect"
                    title={category === "" ? "Selecciona una categoria" : category}
                    data={availableCategories}
                    onSelect={onBrandSelect}
                />
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
                    label="Capacidad del baúl"
                    type="text"
                    placeholder="Ingrese..."
                    value={trunkCapacity}
                    onChange={setTrunkCapacity} />
                <Input 
                    label="Autonomia"
                    type="text"
                    placeholder="Ingrese..."
                    value={autonomy}
                    onChange={setAutonomy} />
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Extra"
                    type="text"
                    placeholder="Ingrese..."
                    value={singleFeature}
                    onChange={setSingleFeature} />
                <Button className="featuresButtonAdd" onClick={addFeature}>Agregar</Button>
                <OverlayTrigger className="featuresOverlay" trigger="click" placement="right" overlay={
                    <Popover id="popover-basic">
                        <Popover.Title as="h3">Extras</Popover.Title>
                        <Popover.Content>
                            {features.length > 0 ? features.map(feature => <p key={feature}>{feature}</p>) : <p>Este vehiculo no tiene extras</p>}
                        </Popover.Content>
                    </Popover>
                }>
                    <Button className="featuresButton" variant="success" >Ver Extras</Button>
                </OverlayTrigger>
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Precio"
                    type="text"
                    placeholder="Ingrese..."
                    value={price}
                    onChange={setPrice} />
                <Form.File.Label >
                    Sube una imagen
                    <Form.File.Input accept="image/png, image/jpeg" className="imageUploader" id="carImage" ref={fileRef} onChange={processImage} />
                </Form.File.Label>
                <DropdownSelect
                    className="dropdownSelect"
                    title={gearBox === "" ? "Selecciona el tipo de caja" : gearBox}
                    data={[{id: 0, name: "automatic"},{id:1, name: "manual"}]}
                    onSelect={onGearBoxSelect}
                />
            </Form.Row>
            <Form.Row>
            <Button className="finishButton" onClick={processForm}>Finalizar</Button>
            </Form.Row>
        </Form>
    )
}