import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Modal, Form, Input, Alert } from 'antd';
import fetch from 'auth/FetchInterceptor';
// import '../.././custom.css'
import axios from 'axios'
import Swal from 'sweetalert2';

const Location = () => {
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sequencenumber, setSequenceNumber] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [updatedWhen, setUpdatedWhen] = useState('');
    const [hasCustomer, setHasCustomer] = useState('');
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        setIsModalVisible(true);
    })

    const handleOk = async () => {
        let formData = {
            sequencenumber: sequencenumber,
            latitude: latitude,
            longitude: longitude,
            updatedWhen: updatedWhen,
            hasCustomer: hasCustomer
        }
        await axios.post(`http://localhost:8000/api/location`, formData).then(({ data }) => {
            console.log(data);
            if (data.success === true) {
                Swal.fire({
                    icon: "success",
                    title: data.result.ailedVehicles[0].sequenceNumber,
                    html: data.result.ailedVehicles[0].reason + '<br>' + data.success + '<br>' + data.resultCode,
                })
            } else if (data.success === false) {
                Swal.fire({
                    icon: "error",
                    title: data.result.ailedVehicles[0].sequenceNumber,
                    html: data.result.ailedVehicles[0].reason + '<br>' + data.success + '<br>' + data.resultCode,
                })
            }

            setSequenceNumber("");
            setLatitude("");
            setLongitude("");
            setUpdatedWhen("");
            setHasCustomer("");
            history.push("/app/wasl")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);

            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })

    };

    const handleCancel = () => {
        // setIsModalVisible(false);
        history.push("/app/wasl")
    };
    return (
        <Modal title="Update Current Location" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 15,
                }}
                layout="horizontal"
            >



                <Form.Item label="vehicleSequenceNumber" rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]} >
                    <Input value={sequencenumber} onChange={(event) => {
                        setSequenceNumber(event.target.value)
                    }} />
                </Form.Item>

                <Form.Item label="latitude" rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]} >
                    <Input value={latitude} onChange={(event) => {
                        setLatitude(event.target.value)
                    }} />
                </Form.Item>

                <Form.Item label="longitude" rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]} >
                    <Input value={longitude} onChange={(event) => {
                        setLongitude(event.target.value)
                    }} />
                </Form.Item>
                <Form.Item label="updatedWhen" rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]} >
                    <Input value={updatedWhen} onChange={(event) => {
                        setUpdatedWhen(event.target.value)
                    }} />
                </Form.Item>
                <Form.Item label="hasCustomer" rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]} >
                    <Input value={hasCustomer} onChange={(event) => {
                        setHasCustomer(event.target.value)
                    }} />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default Location
