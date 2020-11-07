import React, { useEffect, useState } from 'react';
import { DropdownSelect, Header, DataHolder } from '../components';
import { Form } from  'antd';
import { Bar } from 'react-chartjs-2';
import { getAirports } from '../utils/Functions';

import './Report.css'

export default function Report() {
    const [ availableAirports, setAvailableAirports ] = useState([])

    useEffect(() => {
        getAirports().then(airports => {
            airports.push({ id:0, name: "Todos" });
            setAvailableAirports(airports);
        });
    }, [])
    
    
    return (
        <div>
            <Header title="Reporte" />
            <Form>
                <DropdownSelect
                className=""
                    name="airport"
                    label="Aeropuerto"
                    data={availableAirports}
                    value={availableAirports[availableAirports.map(airport => airport.name).indexOf('Todos')]}
                    placeholder="Seleccione el aeropuerto deseado..."
                />
            </Form>
            <div className="chartsRow">
                <DataHolder className="dataHolder">
                    <Bar 
                        data={{
                            labels: ['AutoA', 'AutoB', 'AutoC',
                                    'AutoD', 'AutoE'],
                            datasets: [
                            {
                                label: 'Veces Alquilado',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: [65, 59, 80, 81, 56]
                            }
                            ]
                        }}
                        options={{
                            title:{
                            display:true,
                            text:'Auto más alquilado',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }} 
                    />
                </DataHolder>
                <DataHolder className="dataHolder">
                    <Bar 
                        data={{
                            labels: ['AutoA', 'AutoB', 'AutoC',
                                    'AutoD', 'AutoE'],
                            datasets: [
                            {
                                label: 'Veces Alquilado',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: [65, 59, 80, 81, 56]
                            }
                            ]
                        }}
                        options={{
                            title:{
                            display:true,
                            text:'Auto más alquilado',
                            fontSize:20
                            },
                            legend:{
                            display:true,
                            position:'right'
                            }
                        }} 
                    />
                </DataHolder>
            </div>
        </div>
    )
}
