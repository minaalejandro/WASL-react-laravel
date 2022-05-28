import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Modal, Form, Input, Alert  } from 'antd';
import fetch from 'auth/FetchInterceptor';
// import '../.././custom.css'
import axios from 'axios'
import Swal from 'sweetalert2';

const Operation = () => {
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sequencenumber, setSequenceNumber] = useState('');
    const [rentalId, setRentalId] = useState('');
    const [pickuplatitude, setPickupLatitude] = useState('');
    const [pickuplongitude, setPickupLongtitude] = useState('');
    const [dropofflatitude, setDropoffLatitude] = useState('');
    const [dropofflongitude, setDropoffLongitude] = useState('');
    const [pickuptimestamp, setPickupTimeStamp] = useState('');
    const [dropofftimeStamp, setDropoffTimeStamp] = useState('');
    const [rentalminutes, setRentalMinutes] = useState('');
    const [vehiclerating, setVehicleRating] = useState('');
    const [servicerating, setServiceRating] = useState('');
    const [validationError, setValidationError] = useState({})
    
    useEffect(() =>{
        setIsModalVisible(true);
    })

    const handleOk = async () => {
        let formData = {
			sequencenumber: sequencenumber,
			rentalId: rentalId,
            pickuplatitude: pickuplatitude,
            pickuplongitude: pickuplongitude,
            dropofflatitude: dropofflatitude,
            dropofflongitude: dropofflongitude,
            pickuptimestamp: pickuptimestamp,
            dropofftimeStamp: dropofftimeStamp,
            rentalminutes: rentalminutes,
            vehiclerating: vehiclerating,
            servicerating: servicerating,
		}
        await axios.post(`http://localhost:8000/api/operation`, formData).then(({ data }) => {
            console.log(data);
			Swal.fire({
				icon: "error",
				title: data.message,
                html: data.success + '<br>' + data.resultCode,
			})
			setSequenceNumber("");
			setRentalId("");
            setPickupLatitude("");
            setPickupLongtitude("");
            setDropoffLatitude("");
            setDropoffLongitude("");
            setPickupTimeStamp("");
            setDropoffTimeStamp("");
            setRentalMinutes("");
            setVehicleRating("");
            setServiceRating("");
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
		<Modal title="Rental Operation Registration Service" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
					
					<Form.Item label="companyRentalOperationId" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={rentalId} onChange={(event) => {
							setRentalId(event.target.value)
						}} />
					</Form.Item>
                    
                    <Form.Item label="pickupLatitude" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={pickuplatitude} onChange={(event) => {
							setPickupLatitude(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="pickupLongitude" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={pickuplongitude} onChange={(event) => {
							setPickupLongtitude(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="dropoffLatitude" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={dropofflatitude} onChange={(event) => {
							setDropoffLatitude(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="dropoffLongitude" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={dropofflongitude} onChange={(event) => {
							setDropoffLongitude(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="pickupTimeStamp" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={pickuptimestamp} onChange={(event) => {
							setPickupTimeStamp(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="dropoffTimeStamp" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={dropofftimeStamp} onChange={(event) => {
							setDropoffTimeStamp(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="rentalVehicleOccupationPeriodInMinutes" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={rentalminutes} onChange={(event) => {
							setRentalMinutes(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="customerVehicleRating" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={vehiclerating} onChange={(event) => {
							setVehicleRating(event.target.value)
						}} />
					</Form.Item>
                    <Form.Item label="customerServiceRating" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={servicerating} onChange={(event) => {
							setServiceRating(event.target.value)
						}} />
					</Form.Item>

				</Form>
                
			</Modal>
	)
}

export default Operation
