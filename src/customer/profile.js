import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { API } from '../../src/config/api'
import { Button } from 'react-bootstrap';
import NavbarUser from "./navbarUser";
import "../styles/profile.css";
import Rp from "rupiah-format"
import Logowaysbuck from '../assets/img/logowaysbuck.png'
import Qrcode from '../assets/img/qrcode.png'

export default function Profile() {

  const [dataTrans, setDataTrans] = useState([]);
  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    const dataTrans = async () => {
      try {
        const response = await API.get("/transactions");
        setDataTrans(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataTrans();
  }, [setDataTrans]);

  useEffect(() => {
    const dataCart = async () => {
      try {
        const response = await API.get("/carts-id");
        setDataCart(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataCart();
  }, [setDataCart]);

  const moving = useNavigate()
  const moveTodAddprofile = () => {
    moving(`/addprofile`)
  }
  const moveTodEditprofile = () => {
    moving(`/editprofile`)
  }

  const [dataprofile, setDataprofile] = useState([]);

  useEffect(() => {
    const dataprofile = async () => {
      try {
        const response = await API.get("/profiles");
        setDataprofile(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataprofile();
  }, [setDataprofile]);

  return (
    <>
      <NavbarUser plusOne={dataCart.length} />
      <div className='profile d-flex mt-4 py-3 justify-content-center'>
        <div className='myProfile ms-5'>
          <h2 className=''>MY PROFILE</h2>
          <div className='d-flex mt-4 mb-2'>
            {dataprofile.map((item, index) => (
              <div key={index} item={item}>
                <div className='img-profile'>
                  <img src={item?.image} />
                </div>
                <div className='detail-profile'>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4'>Full name</h5>
                  <p className='ms-4'>{item.user.name}</p>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4 mt-3'>Email</h5>
                  <p className='ms-4'>{item.user.email}</p>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4 mt-3'>Phone</h5>
                  <p className='ms-4'>{item.phone}</p>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4 mt-3'>Address</h5>
                  <p className='ms-4'>{item.address}</p>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4 mt-3'>Gender</h5>
                  <p className='ms-4'>{item.gender}</p>
                  <h5 style={{ color: '#613D2B;' }} className='ms-4 mt-3'>Postcode</h5>
                  <p className='ms-4'>{item.postcode}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className='me-1' variant="danger" onClick={() => moveTodAddprofile()}>Add Profile</Button>
          <Button variant="danger" onClick={() => moveTodEditprofile()}>Edit Profile</Button>
        </div>
        <div className='myTransaction'>
          <h2 className=''>My Transaction</h2>
          {dataTrans.map((item, index) => (
            <div key={index} className='d-flex rounded mb-4'>
              <div className='detailTransaction py-2 px-2'>
                {item.cart.map((itm, idx) => (
                  <div key={idx} className='d-flex'>
                    <div>
                      <img className='img-drink' src={`http://localhost:5000/uploads/` + itm.product?.image} />
                    </div>
                    <div className='ms-3'>
                      <h4 style={{ color: "#BD0707" }}>{itm.product?.title}</h4>
                      {/* <p className='text-danger'> <strong>{item?.day}</strong>, {item?.date}</p> */}
                      {itm.topping.map((topping, inx) => (
                        <p key={inx} className='text-danger'> Toping &nbsp; : {topping?.title}</p>
                      ))}
                      <p className='text-danger'>Price : {Rp.convert(itm?.sub_amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='ms-4 py-2 px-2'>
                <div className='mb-2'>
                  <img src={Logowaysbuck} />
                </div>
                <img src={Qrcode} />
                <div className='mt-2 ms-2'>
                  <span>{item?.status}</span>
                </div>
                <div className='mt-2 ms-2'>
                  <span>{Rp.convert(item?.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
