import React, { useContext, useState } from 'react';
import { Usercontext } from "../context/user-context";
import { Button,Modal,Form, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// import use mutation from react-query 
import { useMutation } from "react-query";

// get API config
import { API } from "../config/api";

import Login from "../pages/login";

function Register() {

  const title = 'register'
  document.title = 'Waysbuck | ' + title

  // switch login
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowLogin = Login
  // 

  const [state, dispatch] = useContext(Usercontext)

  const [message, setMessange] = useState(null)

  function Switchtologin() {
    setShow(false)
    setShow(true)
  }

  const [form, setForm] = useState({
    name  :'',
    email  :'',
    passowrd  :'',
  })

  const { name, email, passowrd } =form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try{
      e.preventDefault();

      const config = {
        headers: {'Content-type': 'application/json',
      },
      }

      const body = json.stringify(form);

      const response = await API.post('/register', body, config);
      
      //handling response 
      const alert = (
        <Alert variant="succsess" className='py-2'>
          register succsess
        </Alert>
      );
      setMessange
    } catch(error) {
      const alert = (
        <Alert variant="danger" className='py-1'>
          failed
        </Alert>
      )
      setMessange(alert)
      console.log(error);
    }
  });

  return (
    <>
      <Button variant="danger" className='ms-2 me-5 bg-danger' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger '>Register</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          asasas
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3">
                <Form.Control 
                className='inputProduct border-danger' 
                type="text" 
                name='name'
                onChange = { handleChange }
                placeholder="Email"  
                style={{width : '100%'}}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control 
                className='inputProduct border-danger' 
                type="email" 
                placeholder="Email" 
                name='email'
                onChange = { handleChange }
                style={{width : '100%'}}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control 
                className='inputProduct border-danger' 
                type="password" 
                placeholder="Password" 
                name='password'
                onChange = { handleChange }
                style={{width : '100%'}}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control className='inputProduct border-danger' type="text" placeholder="Full Name" style={{width : '100%'}}/>
            </Form.Group>
            <Button className='float-sm-end bg-danger' variant="danger" type="submit">
                Register
            </Button>
            <div>
                <p>Already have an account ? klik 
                  <a onClick={Switchtologin}><b>here</b> </a> 
                </p>
            </div>
        </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
        <Login />
      </Modal>
    </>
  );
}

export default Register