import React, { useState, useEffect } from 'react';
import { Header, Vehicles, Footer, Input, LinkButton } from '../components';
import { Affix } from 'antd';
import { CarOutlined, PlusOutlined } from '@ant-design/icons'
import { getVehicles, deleteVehicle } from '../utils/Functions'

import './ListCar.css';


export default function ListCar() {
    const [ vehicles, setVehicles ] = useState(null);
    const [ filteredVehicles, setFilteredVehicles ] = useState(vehicles);

    useEffect(() => {
        loadList()
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



    const processFilter = value => {
        setFilteredVehicles(vehicles.filter(vehicle => vehicle.brand.toLowerCase().includes(value.toLowerCase())))
    };

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
                <Input 
                    placeholder="Buscar..."
                    onChange={processFilter}
                        />
            </div>
            <Vehicles vehicles={filteredVehicles} onDelete={onDelete} />
            <Footer />
        </div>
    )
};
