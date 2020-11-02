import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { Form, Button, Card, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { Input, DropdownSelect } from '.';
import { formatDataToForm } from '../utils/Functions';
import { DELETE_CAR_DATA } from '../actions/Actions';
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
    TRUNKCAPACITY,
    URL,
    fieldValidations,
    LICENSEPLATE
} from '../utils/Constants';
import {
    getAirports,
    getBrands,
    getExtras,
    getModels,
    getCategories
} from '../utils/Functions'

import './FormData.css';


export default function FormData({ onFinish }) {
    const [ fieldsValues, setFieldValues ] = useState([]);
    const dispatch = useDispatch();
    const [ form ] = useForm();
    const statedVehicle = useSelector(state => state)


    const [ availableBrands, setAvailableBrands] = useState(null);
    const [ availableModels, setAvailableModels] = useState(null);
    const [ availableAirports, setAvailableAiports ] = useState(null);
    const [ availableCategories, setAvailableCategories ] = useState(null);
    const [ availableExtras, setAvailableExtras ] = useState(null);

    

    const onFinishTEST = data => {
        const formData = {
            vehicle: data
        }
        console.log(formData)
    };

    useEffect(() => {
        setFieldValues(formatDataToForm(statedVehicle));

        getBrands().then(brands  => setAvailableBrands(brands));
        getAirports().then(airports  => setAvailableAiports(airports));
        getCategories().then(categories  => setAvailableCategories(categories));
        getExtras().then(extras  => setAvailableExtras(extras));

        return () => {
            dispatch({ type: DELETE_CAR_DATA });
        };
    }, [dispatch, statedVehicle])

    const onBrandSelect = value => {
        const id = availableBrands.filter(brand => brand.name === value )[0].id
        reloadModels(id);
    };

    const reloadModels = id => {
        form.setFieldsValue({ [MODEL]: undefined });
        getModels(id).then(models => setAvailableModels(models));
    }

    const onImageUploading = info => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        message.success(`La imagen ${info.file.name} se ha subido correctamente!`);
        } else if (info.file.status === 'error') {
        message.error(`La imagen ${info.file.name} no ha podido ser subida`);
        } 
    };

    return (
        <div className="formCard">
            <Card>
                <Form
                    onFinish={onFinishTEST}
                    fields={fieldsValues}
                    validateMessages={fieldValidations}
                    layout="vertical"
                    form={form}
                >
                    <div className="formRow4Columns">
                            <DropdownSelect
                                name={AIRPORT}
                                label="Aeropuerto"
                                placeholder="Seleccione el aeropuerto deseado"
                                data={availableAirports}
                                rules={[{
                                    required: true
                                }]}   
                            />
                            <DropdownSelect
                                name={BRAND}
                                label="Marca"
                                placeholder="Seleccione la marca deseada"
                                data={availableBrands}
                                rules={[{
                                    required: true
                                }]}
                                onChange={onBrandSelect}
                            />
                            <DropdownSelect
                                allowClear
                                name={MODEL}
                                label="Modelo"
                                placeholder="Seleccione el modelo deseado"
                                data={availableModels}
                                rules={[{
                                    required: true
                                }]}   
                            />
                            <DropdownSelect
                                name={CATEGORY}
                                label="Categoria"
                                placeholder="Seleccione la categoria deseada"
                                data={availableCategories}
                                rules={[{
                                    required: true
                                }]}   
                            />
                    </div>
                    <div className="formRow4Columns">
                            <DropdownSelect
                                name={GEARBOX}
                                label="Tipo de caja"
                                placeholder="Seleccione el tipo de caja"
                                data={[ "automático", "manual" ]}
                                rules={[{
                                    required: true
                                }]}   
                            />
                            <Input 
                                name={DOORS}
                                className="inputForm"
                                label="Cantidad de puertas"
                                type="number"
                                placeholder="Ingrese.."
                                rules={[{
                                    required: true
                                }]}
                            />
                            <Input 
                                name={AUTONOMY}
                                className="inputForm"
                                label="Autonomia"
                                type="number"
                                placeholder="Ingrese.."
                                rules={[{
                                    required: true
                                }]}
                            />
                            <Input 
                                name={CAPACITY}
                                className="inputForm"
                                label="Capacidad de personas"
                                type="number"
                                placeholder="Ingrese.."
                                rules={[{
                                    required: true
                                }]}
                            />
                    </div>
                    <div className="formRow4Columns">
                            <Input 
                                name={TRUNKCAPACITY}
                                className="inputForm"
                                label="Capacidad del baul"
                                type="number"
                                placeholder="Ingrese.."
                                defaultValue={0}
                                rules={[{
                                    required: true
                                }]}
                            />
                            <Input 
                                name={PRICE}
                                className="inputForm"
                                label="Precio"
                                type="number"
                                placeholder="Ingrese.."
                                defaultValue={0}
                                rules={[{
                                    required: true
                                }]}
                            />
                            <Form.Item
                                name={URL}
                                label="Imagen"
                                className="upload"
                                valuePropName="Filelist"
                            >
                                <Upload 
                                    onChange= {onImageUploading}
                                >
                                    <Button icon={<UploadOutlined />}>Haz click para subir una imagen!</Button>
                                </Upload>
                            </Form.Item>
                            <DropdownSelect
                                name={EXTRAS}
                                label="Extras"
                                placeholder="Seleccione los extras deseados"
                                data={availableExtras}
                                mode="multiple"
                            />
                    </div>
                    <div className="formRow4Columns">
                        <Input 
                            name={LICENSEPLATE}
                            className="inputForm"
                            label="Patente"
                            placeholder="Ingrese.."
                            defaultValue={0}
                            rules={[{
                                required: true
                            }]}
                        />
                    </div>
                    <Button className="finishButton" htmlType="submit">
                        Finalizar
                    </Button>
                </Form>
            </Card>
        </div>
    )
}
