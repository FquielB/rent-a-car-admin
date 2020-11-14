import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input, LinkButton, DropdownSelect } from '../components';
import { Affix, Form } from 'antd';
import { CarOutlined, PlusOutlined } from '@ant-design/icons'
import { getVehicles, deleteVehicle, getAirports } from '../utils/Functions'

import './ListCar.css';


export default function ListCar() {
    const [ vehicles, setVehicles ] = useState(null);
    const [ filteredVehicles, setFilteredVehicles ] = useState(vehicles);
    const [ availableAirports, setAvailableAirports ] = useState(null);

    useEffect(() => {
        loadList()
        getAirports().then(airport => setAvailableAirports(airport))
    }, []);

    
    const onDelete = id => {
        deleteVehicle(id).then(res => loadList());
    };

    const loadList = () => {
        setVehicles(null);
        getVehicles().then(vehiclesList => {
            setVehicles(vehiclesList);
            setFilteredVehicles(vehiclesList);
        });
    }

    const processFilterBrand = value => {
        setFilteredVehicles(vehicles.filter(vehicle => vehicle.brand.toLowerCase().includes(value.toLowerCase())))
    };

    const processFilterAirport = value => {
        setFilteredVehicles(filteredVehicles.filter(vehicle => vehicle.brand.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <div className="list">
            <Header 
                title="Lista de autos"
            >
                <LinkButton to="/report" className="reportButton">
                    Ver Reportes
                </LinkButton>
            </Header>
            <Affix offsetTop={120} className="floatingComponent">
                <div className="addButton" >
                    <LinkButton to="/addcar">
                    
                        <div className="addIcons">
                            <CarOutlined />
                            <PlusOutlined/>
                        </div>
                    </LinkButton>
                </div>
            </Affix>
            <div className="search">
                <Form>
                <Input 
                    placeholder="Buscar..."
                    onChange={processFilterBrand}
                />
                <DropdownSelect 
                     label="Aeropuerto"
                     placeholder="Seleccione el aeropuerto deseado"
                     data={availableAirports}
                     onChange={processFilterAirport}
                />
                </Form>       
            </div>
            <Vehicles vehicles={filteredVehicles} onDelete={onDelete} />
            <Footer />
        </div>
    )
};
