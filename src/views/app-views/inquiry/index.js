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
    
    useEffect(() =>{
        setIsModalVisible(true);
    })

    const handleOk = async () => {
		console.log("console");
	
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
