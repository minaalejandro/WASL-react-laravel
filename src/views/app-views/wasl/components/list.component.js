import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export default function List() {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = () => {
        axios.get(`http://localhost:8000/api/products`).then((resp) => {
            // console.log(resp.data);
            setProducts(resp.data);
        });
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }
          await axios.delete(`http://localhost:8000/api/products/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={`${APP_PREFIX_PATH}/wasl/create`}>
                Vehicle Registration
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>ownerIdentityNumber</th>
                                    <th>ownerDateOfBirthHijri</th>
                                    <th>ownerDateOfBirthGragorian</th>
                                    <th>sequenceNumber</th>
                                    <th>plateLetterRight</th>
                                    <th>plateLetterMiddle</th>
                                    <th>plateLetterLeft</th>
                                    <th>plateNumber</th>
                                    <th>plateType</th>
                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Action&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (products.length > 0) && (
                                        products.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.ownerIdentityNumber}</td>
                                                <td>{row.ownerDateOfBirthHijri}</td>
                                                <td>{row.ownerDateOfBirthGregorian}</td>
                                                <td>{row.sequenceNumber}</td>
                                                <td>{row.plateLetterRight}</td>
                                                <td>{row.plateLetterMiddle}</td>
                                                <td>{row.plateLetterLeft}</td>
                                                <td>{row.plateNumber}</td>
                                                <td>{row.plateType}</td>
                                               
                                                <td>
                                                    <Link to={`${APP_PREFIX_PATH}/wasl/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}