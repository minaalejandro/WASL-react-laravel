import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
  const history = useHistory();

  const { id } = useParams()

  const [owneridnum, setOwnerIdNum] = useState("");
  const [ownerdateofbirthhijri, setOwnerDateOfBirthHijri] = useState("");
  const [ownerdateofbirthgregorian, setOwnerDateOfBirthGregorian] = useState("");
  const [sequencenumber, setSequenceNumber] = useState("");
  const [plateletterright, setPlateLetterRight] = useState("");
  const [platelettermiddle, setPlateLetterMiddle] = useState("");
  const [plateletterleft, setPlateLetterLeft] = useState("");
  const [platenumbr, setPlateNumber] = useState("");
  const [platetype, setPlateType] = useState("")
  const [validationError,setValidationError] = useState({})


  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:8000/api/products/${id}`).then(({data})=>{
        // console.log(data.product);
                setOwnerIdNum(data.product.ownerIdentityNumber)
                setOwnerDateOfBirthHijri(data.product.ownerDateOfBirthHijri)
                setOwnerDateOfBirthGregorian(data.product.ownerDateOfBirthGregorian)
                setSequenceNumber(data.product.sequenceNumber)
                setPlateLetterRight(data.product.plateLetterRight)
                setPlateLetterMiddle(data.product.plateLetterMiddle)
                setPlateType(data.product.plateType)
                setPlateLetterLeft(data.product.plateLetterLeft)
                setPlateNumber(data.product.plateNumber)

    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }


  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('owneridnum', owneridnum)
    formData.append('ownerdateofbirthhijri', ownerdateofbirthhijri)
    formData.append('ownerdateofbirthgregorian', ownerdateofbirthgregorian)
    formData.append('sequencenumber', sequencenumber)
    formData.append('plateletterright', plateletterright)
    formData.append('platelettermiddle', platelettermiddle)
    formData.append('plateletterleft', plateletterleft)
    formData.append('platenumbr', platenumbr)
    formData.append('platetype', platetype)
    formData.append('id', id);
    console.log(formData);
  

    await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      history.push("/app/wasl");
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Vehicle Update</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="OwnerIdNum">
                            <Form.Label>ownerIdentityNumber</Form.Label>
                            <Form.Control type="text" value={owneridnum} onChange={(event)=>{
                              setOwnerIdNum(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="OwnerDateBH">
                            <Form.Label>ownerDateOfBirthHijri</Form.Label>
                            <Form.Control type="text" value={ownerdateofbirthhijri} onChange={(event)=>{
                              setOwnerDateOfBirthHijri(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="OwnerDateBG">
                            <Form.Label>ownerDataOfBirthGragorian</Form.Label>
                            <Form.Control type="text" value={ownerdateofbirthgregorian} onChange={(event)=>{
                              setOwnerDateOfBirthGregorian(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="SequenceNum">
                            <Form.Label>sequenceNumber</Form.Label>
                            <Form.Control type="text" value={sequencenumber} onChange={(event)=>{
                              setSequenceNumber(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="OlateLetterRight">
                            <Form.Label>plateLetterRight</Form.Label>
                            <Form.Control type="text" value={plateletterright} onChange={(event)=>{
                              setPlateLetterRight(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="PlateLetterMiddle">
                            <Form.Label>plateLetterMiddle</Form.Label>
                            <Form.Control type="text" value={platelettermiddle} onChange={(event)=>{
                              setPlateLetterMiddle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="PlateLetterLeft">
                            <Form.Label>plateLetterLeft</Form.Label>
                            <Form.Control type="text" value={plateletterleft} onChange={(event)=>{
                              setPlateLetterLeft(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="PlateNum">
                            <Form.Label>plateNumber</Form.Label>
                            <Form.Control type="text" value={platenumbr} onChange={(event)=>{
                              setPlateNumber(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="PlateType">
                            <Form.Label>plateType</Form.Label>
                            <Form.Control type="text" value={platetype} onChange={(event)=>{
                              setPlateType(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}