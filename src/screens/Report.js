import React, { useEffect, useState } from 'react';
import { DropdownSelect, Header, DataHolder, Footer } from '../components';
import { Form } from  'antd';
import { Line, Bar } from 'react-chartjs-2';
import { getAirports, getReport } from '../utils/Functions';

import './Report.css'

export default function Report() {
    const [ availableAirports, setAvailableAirports ] = useState([]);
    const [ report, setReport ] = useState(null);
    const [ selectedAirport, setSelectedAirport] = useState("Todos");

    useEffect(() => {
        getAirports().then(airports => {
            airports.push({ id:0, name: "Todos" });
            setAvailableAirports(airports);
        });
        getReport("").then(reportData => {
            setReport(reportData.data);
        });
    }, [])
    
    const onAirportSelect = value => {
        setSelectedAirport(value)
        getReport(value === "Todos" ? "" : value).then(reportData => {
            setReport(reportData.data);
        });
    }

    return (
        <div>
            <Header title="Reporte" />
            <Form>
                <DropdownSelect
                    className=""
                    name="airport"
                    label="Aeropuerto"
                    data={availableAirports}
                    defaultValue="Todos"
                    placeholder="Seleccione el aeropuerto deseado..."
                    onChange={onAirportSelect}          
                />
            <h3 className="selected">Aeropuerto seleccionado: {selectedAirport} </h3>
            </Form>
            { report ?
            <div className="reports">
                <h1 className="titleReport">Rentas</h1>
            <div className="dataLabels">
            <DataHolder className="dataHolder">
                <h3>Ganancia promedio: {Math.round((report.report_rents.average_earned + Number.EPSILON) * 100) / 100} $</h3>
            </DataHolder>
            <DataHolder className="dataHolder">
                <h3>Tiempo de renta promedio: {Math.round((report.report_rents.average_time + Number.EPSILON) * 100) / 100} días</h3>
            </DataHolder>
            </div> 
                <div className="chartsRow">
                    <DataHolder className="dataHolder">
                        <Line
                            data={{
                                labels: report.report_rents.created.labels,
                                datasets: [{
                                    label: 'Rentas creadas',
                                    backgroundColor: 'rgba(75,192,57,0.4)',
                                    data: report.report_rents.created.data,
                                    borderWidth:0.5,
                                    borderColor: 'rgba(75,192,57,1)'
                                }]
                            }}
                            options={{
                                title:{
                                    display: true,
                                    text:'Rentas creadas los ultimos 30 días',
                                    fontSize: 20
                                },
                                legend:{
                                    display: true,
                                    position:'right'
                                },
                                scales: {
                                    xAxes: [{
                                        gridLines: {
                                            display:false
                                        }
                                    }],
                                    yAxes: [{
                                        gridLines: {
                                            display:false
                                        }   
                                    }]
                                }
                            }}
                            />
                    </DataHolder>
                    <DataHolder className="dataHolder">
                        <Line
                            data={{
                                labels: report.report_rents.moneyFlow.labels,
                                datasets: [{
                                    label: 'Flujo de caja',
                                    backgroundColor: 'rgba(57,75,192,0.4)',
                                    data: report.report_rents.moneyFlow.data,
                                    borderWidth:0.5,
                                    borderColor: 'rgba(57,75,192,1)'
                                }]
                            }}
                            options={{
                                title:{
                                    display: true,
                                    text:'Flujo de caja en los últimos 30 días',
                                    fontSize: 20
                                },
                                legend:{
                                    display: true,
                                    position:'right'
                                },
                                scales: {
                                    xAxes: [{
                                        gridLines: {
                                            display:false
                                        }
                                    }],
                                    yAxes: [{
                                        gridLines: {
                                            display:false
                                        }   
                                    }]
                                }
                            }}
                            />
                    </DataHolder>
                </div>
                <h1 className="titleReport">Vehículos</h1>
                <div className="dataLabels">
                <DataHolder className="dataHolder">
                    <h3>Vehículos disponibles: {report.report_vehicles.available}</h3>
                </DataHolder>
                </div>
                <div className="chartsRow">
                    <DataHolder className="dataHolder vehicleHolder">
                        <Bar 
                            data={{
                                labels: report.report_vehicles.top_5_rented_models.map(rented_models => rented_models[0]),
                                datasets: [
                                {
                                    label: 'Veces Alquilado',
                                    backgroundColor: 'rgba(75,192,75,0.4)',
                                    data: report.report_vehicles.top_5_rented_models.map(rented_models => rented_models[1]),
                                    borderColor: 'rgba(75,192,75,1)',
                                    borderWidth:0.5
                                }
                                ]
                            }}
                            options={{
                                title:{
                                display:true,
                                text:'Modelo más alquilado',
                                fontSize:20
                                },
                                legend:{
                                display:true,
                                position:'right'
                                },
                                scales: {
                                    yAxes: [{
                                        gridLines: {
                                            display:false
                                        },
                                        ticks: {
                                            suggestedMin: 0,
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines: {
                                            display:false
                                        }
                                    }],
                                }
                            }}
                        />
                    </DataHolder>    
                </div>
                <Footer/>
            </div>
            : null
            }
        </div>
    )
}
