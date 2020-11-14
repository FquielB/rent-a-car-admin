import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input, LinkButton, DropdownSelect } from '../components';
import { Affix, Button, Form } from 'antd';
import { CarOutlined, PlusOutlined } from '@ant-design/icons'
import { getVehicles, deleteVehicle, getAirports, getBrands } from '../utils/Functions'

import './ListCar.css';
import { AIRPORT, BRAND, LICENSEPLATE } from '../utils/Constants';


export default function ListCar() {
    const [ vehicles, setVehicles ] = useState(null);
    const [ filteredVehicles, setFilteredVehicles ] = useState(vehicles);
    const [ availableAirports, setAvailableAirports ] = useState(null);
    const [ availableBrands, setAvailableBrands ] = useState(null);

    useEffect(() => {
        loadList()
        getAirports().then(airports => {
            airports.push({ id:0, name: "Todos" });
            setAvailableAirports(airports);
        });
        getBrands().then(brands => {
            brands.push({ id:0, name: "Todos" });
            setAvailableBrands(brands)
        });
       
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

    const processFilter = filters => {
        let filteredList = vehicles.filter(vehicle => (vehicle[LICENSEPLATE].toLowerCase().includes(filters[LICENSEPLATE].toLowerCase()))
                                                        && (filters[BRAND] === "Todos" ? vehicle : vehicle[BRAND] === filters[BRAND])
                                                        && (filters[AIRPORT] === "Todos" ? vehicle : vehicle[AIRPORT] === filters[AIRPORT]));

        setFilteredVehicles(filteredList)
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
                <Form
                    onFinish={processFilter}
                    initialValues={{[LICENSEPLATE]: "", [AIRPORT]:"Todos", [BRAND]: "Todos"}}
                    className="filters"
                    >
                    <div>
                        <Input 
                            name={LICENSEPLATE}
                            label="Patente"
                            placeholder="Buscar por patente..."
                            className="plateFilter"
                        />
                        <div className="filterSelectRow">
                            <DropdownSelect 
                                name={AIRPORT}
                                label="Aeropuerto"
                                placeholder="Seleccione el aeropuerto deseado"
                                data={availableAirports}
                            />
                            <DropdownSelect
                                name={BRAND}
                                label="Marca"
                                placeholder="Seleccione la marca deseada"
                                data={availableBrands}
                            />
                        </div>
                    </div>
                    <Button htmlType="submit" className="searchButton" >Buscar</Button>
                </Form>       
            </div>
            <Vehicles vehicles={filteredVehicles} onDelete={onDelete} />
            <Footer />
        </div>
    )
};
