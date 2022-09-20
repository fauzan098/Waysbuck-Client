import { React, useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Usercontext } from "../context/user-context";
import { useNavigate } from 'react-router';
import logowaysbuck from '../assets/img/logowaysbuck.png'
import { useMutation } from 'react-query';
import { API } from '../config/api'
import { Alert } from 'react-bootstrap';

export default function AuthModal() {
  const [show, setShow] = useState(false);

  const [showRegister, setShowRegister] = useState(false);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Switchtologin() {
    setShow(false)
    setShowRegister(true)
  }
  function SwitchtoRegister() {
    setShowRegister(false)
    setShow(true)
  }

  const [state, dispatch] = useContext(Usercontext)

  const [messageRegister, setMessageRegister] = useState(null);


  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = form;


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const navigate = useNavigate()


  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post('/register', body, config);

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessageRegister(alert);
      console.log(error);
    }
  });


  //Login
  const [message, setMessage] = useState(null);

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const { emailLogin, passwordLogin } = formLogin;

  const handleChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process with useMutation here ...
  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(formLogin);

      // Insert data user to database
      const response = await API.post('/login', body, config);
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data
        })

        if (response.data.data.status == "admin") {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }

    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <div className='navbar ms-5 me-5'   >
        <div className='ms-5 mt-2'>
          <img src={logowaysbuck} style={{ cursor: 'pointer' }} />
        </div>
        <div className='detail-productPage d-flex me-3'>
          <div className='d-flex'>
            <Button variant="primary" className='ms-2 me-2 bg-white border-danger text-danger' onClick={handleShow}>
              Login
            </Button>
          </div>
          <div className='d-flex'>
            <Button variant="danger" className='ms-2 me-5 bg-danger' onClick={handleShowRegister}>
              Register
            </Button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(e) => handleLogin.mutate(e)}>
            <Form.Group className="mb-3" >
              <Form.Control
                className='inputProduct border-danger'
                type="email"
                name='email'
                value={emailLogin}
                id='emailinput'
                placeholder="Email"
                onChange={handleChangeLogin}
                style={{ width: '100%' }} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                className='inputProduct border-danger'
                type="password"
                name='password'
                value={passwordLogin}
                id='passwordinput'
                placeholder="Password"
                onChange={handleChangeLogin}
                style={{ width: '100%' }} />
            </Form.Group>
            <Button className='float-sm-end bg-danger xs-{3}' variant="danger" type="submit">
              Login
            </Button>
            <div>
              <p>Don't have an account ? klik
                <a onClick={Switchtologin} style={{ cursor: 'pointer' }}><b> here</b> </a>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messageRegister && messageRegister}
          <Form onSubmit={(e) => handleRegister.mutate(e)}>
            <Form.Group className="mb-3" >
              <Form.Control
                className='inputProduct border-danger'
                type="email"
                value={email}
                name="email"
                placeholder="Email"
                onChange={handleChange}
                style={{ width: '100%' }} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                className='inputProduct border-danger'
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                style={{ width: '100%' }} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control
                className='inputProduct border-danger'
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Full Name"
                style={{ width: '100%' }} />
            </Form.Group>
            <Button
              className='float-sm-end bg-danger'
              variant="danger"
              type="submit">
              Register
            </Button>
            <div>
              <p>Already have an account ? klik
                <a onClick={SwitchtoRegister} style={{ cursor: 'pointer' }}><b> here</b> </a>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
