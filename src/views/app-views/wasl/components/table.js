/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from 'axios'
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

export default function Expand(props) {
    const [data, setData] = useState([]);
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
        axios.get(`http://localhost:8000/api/products`).then((resp) => {
            // console.log(resp.data);
            setData(resp.data);
        });
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    const handleEdit = (rowData) => () => {

        console.log(rowData);
    }
    const handleDelete = (rowData) => () => {
        // confirm({
        //     title: "Do you want to delete these items?",
        //     content:
        //       "When clicked the OK button, this dialog will be closed after 1 second",
        //     onOk() {
        //         fetch({
        //             url: '/deleteAdmin/' + id,
        //             method: 'post',
        //             headers: {
        //                 'public-request': 'true'
        //             },
        //         }).then((resp) => {
        //             setReloadState(s => !s);

        //         })
        //     },
        //     onCancel() { }
        //   });


    }

    return (
        <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
    );
}



