import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Modal, Form, Input, Alert  } from 'antd';
import fetch from 'auth/FetchInterceptor';
// import '../.././custom.css'
import axios from 'axios'
import Swal from 'sweetalert2';

const Inquiry = () => {
    const history = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [platenumbr, setPlateNumber] = useState('');
    const [sequencenumber, setSequenceNumber] = useState('');
    const [validationError, setValidationError] = useState({})
    
    useEffect(() =>{
        setIsModalVisible(true);
    })

    const handleOk = async () => {
        let formData = {
			sequencenumber: sequencenumber,
			platenumbr: platenumbr,
		}
        await axios.post(`http://localhost:8000/api/inquiry`, formData).then(({ data }) => {
            console.log(data);
			Swal.fire({
				icon: "error",
				title: data.message,
                html: data.success + '<br>' + data.resultCode,
			})
			setSequenceNumber("");
			setPlateNumber("");
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
		<Modal title="Vehicle Inquiry" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Form
					labelCol={{
						span: 10,
					}}
					wrapperCol={{
						span: 15,
					}}
					layout="horizontal"
				>
					
					
					
					<Form.Item label="sequenceNumber" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={sequencenumber} onChange={(event) => {
							setSequenceNumber(event.target.value)
						}} />
					</Form.Item>				
					
					<Form.Item label="plateNumber" rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]} >
						<Input value={platenumbr} onChange={(event) => {
							setPlateNumber(event.target.value)
						}} />
					</Form.Item>

				</Form>
			</Modal>
	)
}

export default Inquiry
