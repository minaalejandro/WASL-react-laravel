/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Input, } from "antd";
import axios from 'axios'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2';

export default function Expand(props) {
    const { confirm } = Modal;
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [owneridnum, setOwnerIdNum] = useState('');
    const [ownerdateofbirthhijri, setOwnerDateOfBirthHijri] = useState('');
    const [ownerdateofbirthgregorian, setOwnerDateOfBirthGregorian] = useState('');
    const [sequencenumber, setSequenceNumber] = useState('');
    const [plateletterright, setPlateLetterRight] = useState('');
    const [platelettermiddle, setPlateLetterMiddle] = useState('');
    const [plateletterleft, setPlateLetterLeft] = useState('');
    const [platenumbr, setPlateNumber] = useState('');
    const [platetype, setPlateType] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(true);
    const columns = [
        {
            title: "ownerIdentityNumber",
            width: 200,
            dataIndex: "ownerIdentityNumber",
            key: "ownerIdentityNumber",
            fixed: "left"
        },
        {
            title: "ownerDateOfBirthGregorian",
            width: 220,
            dataIndex: "ownerDateOfBirthGregorian",
            key: "ownerDateOfBirthGregorian",
            fixed: "left"
        },
        {
            title: "ownerDateOfBirthGragorian",
            dataIndex: "ownerDateOfBirthHijri",
            key: "ownerDateOfBirthHijri",
            width: 220
        },
        {
            title: "sequenceNumber",
            dataIndex: "sequenceNumber",
            key: "sequenceNumber",
            width: 200
        },
        {
            title: "plateLetterRight",
            dataIndex: "plateLetterRight",
            key: "plateLetterRight",
            width: 200
        },
        {
            title: "plateLetterMiddle",
            dataIndex: "plateLetterMiddle",
            key: "plateLetterMiddle",
            width: 200
        },
        {
            title: "plateLetterLeft",
            dataIndex: "plateLetterLeft",
            key: "plateLetterLeft",
            width: 200
        },
        {
            title: "plateNumber",
            dataIndex: "plateNumber",
            key: "plateNumber",
            width: 200
        },
        {
            title: "plateType",
            dataIndex: "plateType",
            key: "plateType",
            width: 200
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (rowData) => {
                return (
                    <>
                        <div style={{ display: "flex" }}>
                            <div style={{ padding: "10px" }}><EditOutlined onClick={handleEdit(rowData)} /></div>
                            <div style={{ padding: "10px" }}><DeleteOutlined onClick={handleDelete(rowData)} /></div>
                        </div>
                    </>
                )
            }
        }
    ];

    const fetchProducts = async () => {
        setLoading(true);
        axios.get(`http://localhost:8000/api/products`).then((resp) => {
            // console.log(resp.data);
            setLoading(false)
            setData(resp.data);
        });
    }

    useEffect(() => {
        fetchProducts();
    }, [state, props.state]);
    const handleEdit = (rowData) => () => {
        console.log(rowData);
        setId(rowData.id);
        setIsModalVisible(true);
        setOwnerIdNum(rowData.ownerIdentityNumber);
        setOwnerDateOfBirthHijri(rowData.ownerDateOfBirthHijri);
        setOwnerDateOfBirthGregorian(rowData.ownerDateOfBirthGregorian)
        setSequenceNumber(rowData.sequenceNumber)
        setPlateLetterRight(rowData.plateLetterRight)
        setPlateLetterMiddle(rowData.plateLetterMiddle)
        setPlateLetterLeft(rowData.plateLetterLeft)
        setPlateNumber(rowData.plateNumber)
        setPlateType(rowData.plateType)

    }
    const handleDelete = (rowData) => async () => {
        // console.log(rowData.id);
       
        confirm({
            title: "Do you want to delete these items?",
            content:
                "When clicked the OK button, this dialog will be closed after 1 second",
           async onOk() {
                 let id = rowData.id;
                await axios.delete(`http://localhost:8000/api/products/${id}`).then(({ data }) => {
                    Swal.fire({
                        icon: "success",
                        text: data.message
                    })
                    setState(s => !s);
                }).catch(({ response: { data } }) => {
                    Swal.fire({
                        text: data.message,
                        icon: "error"
                    })
                })
            },
            onCancel() { }
        });


    }
    const handleOk = async () => {
        setLoading(true);
        let formData = {
            id: id,
            owneridnum: owneridnum,
            ownerdateofbirthhijri: ownerdateofbirthhijri,
            ownerdateofbirthgregorian: ownerdateofbirthgregorian,
            sequencenumber: sequencenumber,
            plateletterright: plateletterright,
            platelettermiddle: platelettermiddle,
            plateletterleft: plateletterleft,
            platenumbr: platenumbr,
            platetype: platetype
        }
        await axios.put(`http://localhost:8000/api/products/${id}`, formData).then(({ data }) => {
            setLoading(false);
            setState(s => !s);
            setIsModalVisible(false);
            Swal.fire({
                icon: "success",
                text: data.message
            })

        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })

    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} loading={loading} />
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
                        <Input value={ownerdateofbirthgregorian} onChange={(event) => {
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
    );
}



