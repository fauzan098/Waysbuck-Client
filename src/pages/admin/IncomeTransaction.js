import React, { useEffect, useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap';
import '../../styles/tableIncomeTransaction.css'
import Logowaysbuck from '../../assets/img/logowaysbuck.png'
import Qrcode from '../../assets/img/qrcode.png'
import NavbarAdmin from "../admin/navbarAdmin";
import DataTransaction from "../../components/DataDummy/DataincomTransaction";
import Dummytransactions from "../../components/DataDummy/transactiocard";
import Rp from "rupiah-format"
import "../../styles/style.css"
import { API } from '../../config/api';

export default function IncomeTransaction() {

  const [dataTrans, setDataTrans] = useState([])
  const [dataUsers, setDataUsers] = useState([])

  useEffect(() => {
    const dataTrans = async () => {
      try {
        const response = await API.get("/carts-id")
        setDataTrans(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataTrans();
  }, [setDataTrans]);

  useEffect(() => {
    const dataUsers = async () => {
      try {
        const response = await API.get("/users")
        setDataUsers(response.data.data)
      } catch (error) {
        console.log(error);
      }
    };
    dataUsers();
  }, [setDataUsers]);

  let total = 0

  dataTrans.forEach((item) => {
    total += item?.sub_amount
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <NavbarAdmin/> */}
      <Modal show={show} onHide={handleClose}>
        <div className='d-flex rounded' style={{ background: '#F7DADA' }}>
          <div className='detailTransaction py-2 px-2'>
            {dataTrans.map((item, index) => (
              <div className='d-flex' key={index}>
                <div>
                  <img className='img-drink' src={item.product?.image} />
                </div>
                <div className='ms-3'>
                  <h4 style={{ color: "#BD0707" }}>{item.product?.title}</h4>
                  {/* <p className='text-danger'> <strong>{item?.day}</strong>, {item?.date}</p> */}
                  {item.topping.map((topping, idx) => (
                    <p key={idx} className='text-danger'> Toping &nbsp; : {topping?.title}</p>
                  ))}
                  <p className='text-danger'>Price : {Rp.convert(item?.sub_amount)}</p>
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
              <span>on the way</span>
            </div>
            <div className='mt-2 ms-2'>
              <span>{Rp.convert(total)}</span>
            </div>
          </div>
        </div>
      </Modal>
      <NavbarAdmin />
      <div className='title-product mb-5 mt-5'>
        <h2>Income Transaction</h2>
      </div>
      <div className='table-incomeTransaction '>
        <Table bordered >
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Post Code</th>
              <th>Income</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((item,index) => (
              <tr>
                <td>{item?.id}</td>
                <td>{item?.fullname}</td>
                <td>{item.profile?.address}</td>
                <td>{item.profile?.postcode}</td>
                <td className='income'><p onClick={handleShow} style={{ cursor: 'pointer' }}>{item.transaction?.amount}</p></td>
                <td className={`status-transaction-${item.transaction?.status}`}>{item.transaction?.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}
