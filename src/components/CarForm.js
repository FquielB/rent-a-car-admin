import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { Input, DropdownSelect } from './';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/auth';

import { toBase64 } from '../utils/Functions';
import { 
    MODEL,
    BRAND,
    CAPACITY,
    CATEGORY,
    AIRPORT,
    AUTONOMY,
    DOORS,
    GEARBOX,
    EXTRAS,
    PRICE,
    ID,
    TRUNKCAPACITY,
    URL
} from '../utils/Constants';

import './CarForm.css';


export default function CarForm({ onFinish }) {
    const carData = useSelector( state => state );
    const dispatch = useDispatch();
    
    const fileRef = useRef();
    const { authTokens } = useAuth();

    const [ formData, setFormData ] = useState(carData);
    const [ singleExtra, setSingleExtra ] = useState("");

    const [ availableBrands, setAvailableBrands] = useState(null);
    const [ availableModels, setAvailableModels] = useState(null);
    const [ availableAirports, setAvailableAiports ] = useState(null);
    const [ availableCategories, setAvailableCategories ] = useState(null);


    const [ headers, setHeaders ] = useState({'Authorization': authTokens.token});

    useEffect(() => {
        axios.get('https://rent-a-car-uade.herokuapp.com/brands', { headers })
        .then( res => setAvailableBrands(res.data.brands))
        .catch( error => alert("No se han podido obtener marcas", error ));
        
        axios.get('https://itinerarios-back.herokuapp.com/itinerarios/rest/aeropuertos/')
        .then( res => setAvailableAiports(res.data))
        .catch(error => alert("No se han podido obtener los aeropuertos", error));

        axios.get('https://rent-a-car-uade.herokuapp.com/categories', { headers })
        .then(res => setAvailableCategories(res.data.categories))
        .catch( error => alert("No se han podido obtener las categorias", error));

    }, [headers]);

    const onBrandSelect = e => {
        e.preventDefault();
        const { name, value, id } = e.target;
        
        setFormData({
            ...formData,
            [MODEL]: ""
        });

        setFormData({
            ...formData,
            [name]: value
        });

        axios.get(`https://rent-a-car-uade.herokuapp.com/models/${id}`, { headers })
        .then( res => setAvailableModels(res.data.models))
        .catch( error => alert("No se han podido obtener marcas", error ));
    };

    const onChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const processForm = () =>{
        var data = {
            vehicle: formData
        };
        onFinish(data);
        dispatch({ type: DELETE_CAR_DATA });
    };

    const addExtra = () => {
        setFormData({
            ...formData,
            [EXTRAS]: formData[EXTRAS].concat(singleExtra)
        });
        setSingleExtra("");
    };

    const processImage = e => {
        e.preventDefault();
        const { files } = e.target;

        const datafiles = Array.from(files);
        toBase64(datafiles[0]).then(processedFile => 
            setFormData({
                ...formData,
                [URL]:datafiles[0].name
            })
        );
    };

    return (
        <Form>
            <Form.Row>
                <DropdownSelect
                    name={AIRPORT}
                    className="dropdownSelect"
                    title={formData[AIRPORT] === "" ? "Selecciona un aeropuerto" : formData[AIRPORT]}
                    data={availableAirports}
                    onSelect={onChange}
                />
                <DropdownSelect
                    name={BRAND}
                    className="dropdownSelect"
                    title={formData[BRAND] === "" ? "Selecciona una marca" : formData[BRAND]}
                    data={availableBrands}
                    onSelect={onBrandSelect}
                />
                <DropdownSelect
                        name={MODEL}
                        className="dropdownSelect"
                        title={formData[MODEL] === "" ? "Seleccione un modelo" : formData[MODEL]}
                        data={availableModels}
                        onSelect={onChange}
                    /> 
                <DropdownSelect
                    name={CATEGORY}
                    className="dropdownSelect"
                    title={formData[CATEGORY] === "" ? "Selecciona una categoria" : formData[CATEGORY]}
                    data={availableCategories}
                    onSelect={onChange}
                />
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Cantidad de puertas"
                    type="number"
                    placeholder="Ingrese..."
                    value={formData[DOORS]}
                    onChange={onChange} />
                <Input 
                    label="Capacidad"
                    type="number"
                    placeholder="Ingrese..."
                    value={formData[CAPACITY]}
                    onChange={onChange} />
                <Input 
                    label="Capacidad del baúl"
                    type="number"
                    placeholder="Ingrese..."
                    value={formData[TRUNKCAPACITY]}
                    onChange={onChange} />
                <Input 
                    label="Autonomia"
                    type="number"
                    placeholder="Ingrese..."
                    value={formData[AUTONOMY]}
                    onChange={onChange} />
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Extra"
                    type="text"
                    placeholder="Ingrese..."
                    value={singleExtra}
                    onChange={setSingleExtra} />
                <Button className="featuresButtonAdd" onClick={addExtra}>Agregar</Button>
                <OverlayTrigger className="featuresOverlay" trigger="click" placement="right" overlay={
                    <Popover id="popover-basic">
                        <Popover.Title as="h3">Extras</Popover.Title>
                        <Popover.Content>
                            {   formData[EXTRAS].length > 0 ? 
                                    formData[EXTRAS].map(extra => <p key={extra}>{extra}</p>) 
                                : 
                                    <p>Este vehiculo no tiene extras</p>
                            }
                        </Popover.Content>
                    </Popover>
                }>
                    <Button className="featuresButton" variant="success" >Ver Extras</Button>
                </OverlayTrigger>
            </Form.Row>
            <Form.Row>
                <Input 
                    label="Precio"
                    type="number"
                    placeholder="Ingrese..."
                    value={formData[PRICE]}
                    onChange={onChange} />
                <Form.File.Label >
                    Sube una imagen
                    <Form.File.Input accept="image/png, image/jpeg" className="imageUploader" id="carImage" ref={fileRef} onChange={processImage} />
                </Form.File.Label>
                <DropdownSelect
                    className="dropdownSelect"
                    title={formData[GEARBOX] === "" ? "Selecciona el tipo de caja" : formData[GEARBOX]}
                    data={[{id: 0, name: "automatic"},{id:1, name: "manual"}]}
                    onSelect={onChange}
                />
            </Form.Row>
            <Form.Row>
            <Button className="finishButton" onClick={processForm}>Finalizar</Button>
            </Form.Row>
        </Form>
    )
}