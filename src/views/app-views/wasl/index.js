import React, { useState } from 'react'
import { Button, Modal, Form, Input, Row, Col } from 'antd';
import fetch from 'auth/FetchInterceptor';
import '../.././custom.css'

const Wasl = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [owneridnum, setOwnerIdNum] = useState('');
	const [ownerdateofbirthhijri, setOwnerDateOfBirthHijri] = useState('');
	const [ownerdateofbirthgregorian, setOwnerDateOfBirthGregorian] = useState('');
	const [sequencenumber, setSequenceNumber] = useState('');
	const [plateletterright, setPlateLetterRight] = useState('');
	const [platelettermiddle, setPlateLetterMiddle] = useState('');
	const [plateletterleft, setPlateLetterLeft] = useState('');
	const [platenumbr, setPlateNumber] = useState('');
	const [platetype, setPlateType] = useState('');
	const handleCreate = () => {
		setIsModalVisible(true)
	}
	const handleOk = () => {
		let params = {
			owneridnum: owneridnum,
			ownerdateofbirthhijri: ownerdateofbirthhijri,
			ownerdateofbirthgregorian : ownerdateofbirthgregorian,
			sequencenumber: sequencenumber,
			plateletterright: plateletterright,
			platelettermiddle: platelettermiddle,
			plateletterleft: plateletterleft,
			platenumbr: platenumbr,
			platetype: platetype
		}
		fetch({
            url: '/products',
            method: 'post',
            headers: {
                'public-request': 'true'
            },
            params,
        }).then((resp) => {
			setIsModalVisible(false);
           console.log("sucess");
		})
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<>
			<div className='header'>
				<h1>Wasl Management</h1>
				<Button type="primary" onClick={handleCreate}>Vehicle Registration</Button>
			</div>
			<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Form
					labelCol={{
						span: 10,
					}}
					wrapperCol={{
						span: 15,
					}}
					layout="horizontal"
				>
					<Form.Item label="ownerIdentityNumber" rules={[{ required: true, },]}>
						<Input value={owneridnum} onChange={(event) => {
							setOwnerIdNum(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="ownerDateOfBirthHijri" rules={[{ required: true, },]} >
						<Input value={ownerdateofbirthhijri} onChange={(event) => {
							setOwnerDateOfBirthHijri(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="ownerDataOfBirthGragorian" rules={[{ required: true, },]} >
						<Input ovalue={ownerdateofbirthgregorian} onChange={(event) => {
							setOwnerDateOfBirthGregorian(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="sequenceNumber" rules={[{ required: true, },]} >
						<Input value={sequencenumber} onChange={(event) => {
							setSequenceNumber(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="plateLetterRight" rules={[{ required: true, },]} >
						<Input value={plateletterright} onChange={(event) => {
							setPlateLetterRight(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="plateLetterMiddle" rules={[{ required: true, },]} >
						<Input value={platelettermiddle} onChange={(event) => {
							setPlateLetterMiddle(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="plateLetterLeft" rules={[{ required: true, },]} >
						<Input value={plateletterleft} onChange={(event) => {
							setPlateLetterLeft(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="plateNumber" rules={[{ required: true, },]} >
						<Input value={platenumbr} onChange={(event) => {
							setPlateNumber(event.target.value)
						}} />
					</Form.Item>
					<Form.Item label="plateType" rules={[{ required: true, },]} >
						<Input value={platetype} onChange={(event) => {
							setPlateType(event.target.value)
						}} />
					</Form.Item>

				</Form>
			</Modal>
		</>
	)
}

export default Wasl
