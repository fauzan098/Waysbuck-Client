import React, { useState, useContext } from 'react';
import {Alert, Button, Modal, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { useMutation } from 'react-query';
import { API } from '../config/api';
import { Usercontext } from '../context/user-context';

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const [ state, dispatch ] = useContext(Usercontext)

  const [ message, setMessange ] =useState(null)
  
  function Switchtoregister() {
    setShow(false)
    setShow(true)
  }

  const [ form, setForm ] = useState({
    email: '',
    password: '',
  })
  
  const {email, password} = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          'Content-type' : 'application/json',
        }
      }

    const body = JSON.stringify(form)

    const response = await API.post('/login', body, config)

    if (response?.status === 200) {
      dispatch({
        type: 'LOGIN_SUCCSESS',
        payload : response.data.data
      })
      if(response.data.data.status = 'admin'){
        navigate('/admin')
      }
    } else {
      navigate('/')
    }

    } catch (error) {
      const alert = (
        <Alert variant='danger' className='py1'>
          failed
        </Alert>
      )
      setMessange(alert)
      console.log(error)
    }
  })
  // function handleOnSubmit(e) {
  //   e.preventDefault();

  //   const email = document.getElementById("email").value
  //   const password = document.getElementById("password").value
  //   let status
    
  //   if (email === "admin@mail.com") {
  //     status = "admin"
  //     navigate('/admin')
  //   } else {
  //     status = "customer"
  //     navigate ('/home')
  //   }
  
  //   const data = { email, password ,status }

  //   console.log(data);

  //   setUser({
  //     type: 'LOG_IN',
  //     payload: data
  //   })
  // }



  return (
    <>
      <Button variant="danger" className='ms-2 me-5 bg-danger' onClick={handleShow}>
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger '>Login</Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          asasas
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                Login
            </Button>
            <div>
                <p>Already have an account ? klik 
                  <a onClick={Switchtoregister}><b>here</b> </a> 
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

export default Login