import React, { useState, useContext, useEffect } from 'react'
import Landing from '../components/background'
import "../styles/style.css"
import { Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { API } from '../config/api'
import Rectangle from '../assets/img/Rectangle.png'
import NavbarUser from '../customer/navbarUser'
import '../styles/style.css'

export default function Main() {

  const moving = useNavigate()
  const moveTodetailDrink = (index) => {
    moving(`/detail-drink/` + index)
  }

  
  const [dataproduct, setDataproduct] = useState([]);
  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  useEffect(() => {
    const dataCart = async () => {
        try {
            const response = await API.get("/carts-id")
            setDataCart(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    dataCart();
}, [setDataCart]);

  return (
    <>
        <NavbarUser plusOne={dataCart.length}/>
        <div className=''>
                  <Card id='card-main'>
                  <div className='card-name'>
                      <p id="title-card-home">Waysbuck</p>
                  </div>
                  <div className='card-name'>
                      <p id='title-card-home2'>Things are changing, but we're still here for you</p>
                  </div>
                  <div className='card-name'>
                      <p id='title-card-home2'>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. <b className='fw-bold'>Waysbucks</b> Drivers is also availabe <br></br><br></br> Let's Order...</p>
                  </div>
                  <Landing />
                  <img id='img-main' src={Rectangle} />
              </Card>
              <div className='f1'>
                    <p>Let's order</p>
              </div>
              <div className='f2 me-5 mb-5'>
                {dataproduct.map((item, index) => (
                  <Card className="DrinkList me-5 mb-3" style={{ width: '18rem' }} key={index}>
                    <Card.Img variant="top" src={item?.image} onClick={() => moving(`/detail-drink/` + item?.id) }/>
                    <Card.Body>
                      <Card.Title className='cardTitle mb-3'>{item?.title}</Card.Title>
                      <Card.Text className='cardPrice mb-2'>Rp.{item?.price}</Card.Text>
                    </Card.Body>
                </Card>
                ))}
              </div>
        </div>
  </>
  )
}
