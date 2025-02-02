import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { Form, Button, Upload, Modal } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { Input, DropdownSelect, DataHolder } from '.';
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
    getCategories,
    getBoxTypes
} from '../utils/Functions';

import './VehicleForm.css';


export default function VehicleForm({ onFinish }) {
    const [ fieldsValues, setFieldValues ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ imageToLoad, setImageToLoad ] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const [ form ] = useForm();
    const statedVehicle = useSelector(state => state)

    const { error } = Modal;

    const [ availableBrands, setAvailableBrands] = useState(null);
    const [ availableModels, setAvailableModels] = useState(null);
    const [ availableAirports, setAvailableAiports ] = useState(null);
    const [ availableCategories, setAvailableCategories ] = useState(null);
    const [ availableExtras, setAvailableExtras ] = useState(null);
    const [ boxTypes, setBoxTypes ] = useState(null);


    const processSubmit = (data) => {
        setIsLoading(true);
        data.active= true
        if(statedVehicle.id)
            data.id = statedVehicle.id;
        const formData = {
            vehicle: data,
        };
        onFinish(formData, image);
    };

    useEffect(() => {
        setFieldValues(formatDataToForm(statedVehicle));

        getBrands().then(brands  => setAvailableBrands(brands));
        getAirports().then(airports  => setAvailableAiports(airports));
        getCategories().then(categories  => setAvailableCategories(categories));
        getExtras().then(extras  => setAvailableExtras(extras));
        getBoxTypes().then(boxTypes => setBoxTypes(boxTypes));

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

    const onFileUploading = ({ file, onSuccess }) => {
        try {
            let fileData = new FormData();
            fileData.append(
                'image',
                file,
                `${Date.now()}-${file.name}`
            );
            setImage(fileData);
            onSuccess("ok");
        }
        catch{
            onSuccess("Failed")
        }
    };

    const validateFile = file => {
        let fileExt = file.name.split(".");
        fileExt = fileExt[fileExt.length - 1];
        if((file.type === "image/jpeg" || file.type === "image/png") && ( fileExt==="png" || fileExt==="jpg" )){
            let fileList = [file];
            setImageToLoad(fileList);
        }
        else{
            error({
                title:"El archivo que elegiste no es una imagen!"
            })
        }
    }
   
    return (
        <DataHolder>
                <Form
                    onFinish={processSubmit}
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
                                data={boxTypes}
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
                                min={0}
                            />
                            <Input 
                                name={AUTONOMY}
                                className="inputForm"
                                label="Autonomia (km/l)"
                                type="number"
                                placeholder="Ingrese.."
                                rules={[{
                                    required: true
                                }]}
                                min={0}
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
                                min={0}
                            />
                    </div>
                    <div className="formRow4Columns">
                            <Input 
                                name={TRUNKCAPACITY}
                                className="inputForm"
                                label="Capacidad del baul (en litros)"
                                type="number"
                                placeholder="Ingrese.."
                                defaultValue={0}
                                rules={[{
                                    required: true
                                }]}
                                min={0}
                            />
                            <Input 
                                name={PRICE}
                                className="inputForm"
                                label="Precio (por día)"
                                type="number"
                                placeholder="Ingrese.."
                                defaultValue={0}
                                rules={[{
                                    required: true
                                }]}
                                min={0}
                            />
                            <Input 
                                name={LICENSEPLATE}
                                className="inputForm"
                                label="Patente"
                                placeholder="Ingrese.."
                                defaultValue={0}
                                rules={[{
                                    required: true
                                }]}
                                min={0}
                            />
                    </div>
                    <div className="formRow4Columns">
                            <DropdownSelect
                                name={EXTRAS}
                                label="Extras"
                                placeholder="Seleccione los extras deseados"
                                data={availableExtras}
                                mode="multiple"
                            />
                            <Form.Item
                                name={URL}
                                label="Imagen"
                                className="upload"
                                valuePropName="Filelist"
                            >
                                <Upload 
                                    customRequest={onFileUploading}
                                    accept={[".png",".jpg"]}
                                    fileList={imageToLoad}
                                    beforeUpload={validateFile}
                                >
                                    <Button icon={<UploadOutlined />} >Haz click para subir una imagen!</Button>
                                </Upload>
                            </Form.Item>
                    </div>
                    <Button className="finishButton" htmlType="submit" disabled={isLoading}>
                        {isLoading ? <LoadingOutlined /> : "Guardar" }
                    </Button>
                </Form>
            </DataHolder>
    )
}
