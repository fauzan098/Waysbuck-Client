import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import NavbarUser from './navbarUser'
import '../styles/detailProduct.css'
import { API } from '../config/api'
import Rp from "rupiah-format"
import { useNavigate, useParams } from 'react-router'
import DummyDataToping from "../components/DataDummy/DataToping"
import { useMutation } from 'react-query';

export default function DetailProduct() {

  const Navigate = useNavigate();

  const [dataDetail, setDataDetail] = useState([]);
  const params = useParams();

  const dataProduct = async () => {
    try {
      const response = await API.get("/product/" + params.id);
      setDataDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dataProduct();
  }, []);

  const [dataTrans, setDataTrans] = useState()

  const dataCrans = async () => {
    try {
      const response = await API.get("/transactions")
      setDataTrans(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dataCrans();
  }, []);


  const [checkedState, setCheckedState] = useState(
    new Array(DummyDataToping.id).fill(false)
  )


  const [toping, setToping] = useState([]);
  const [topping_id, setIdToping] = useState([]);


  const handleOnchage = (e) => {

    let updateToping = [...toping];
    if (e.target.checked) {
      updateToping = [...toping, e.target.value];
    } else {
      updateToping.splice(toping.indexOf(e.target.value));
    }
    setToping(updateToping);

    let toppingId = [...topping_id];
    if (e.target.checked) {
      toppingId = [...topping_id, parseInt(e.target.name)];
    } else {
      toppingId.splice(topping_id.indexOf(e.target.name));
    }

    setIdToping(toppingId);
  };
  const [dataproduct, setDataproduct] = useState([]);

  let total = toping.reduce((a, b) => {
    return a + parseInt(b);
  }, 0);


  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/toppings");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);


  const [cartCounter, setCartCounter] = useState(0)
  const handleOnIncrease = () => {
    return setCartCounter(cartCounter + 1)
  }


  let qty = 1;
  let amount = dataDetail?.price + total

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.post("/transaction", config);

      const body = JSON.stringify({
        sub_amount: amount,
        qty: qty,
        topping_id: topping_id,
        product_id: parseInt(params.id),
      });

      await API.post("/cart", body, config);

      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <>
      <NavbarUser plusOne={cartCounter} />
      <div className='d-flex justify-content-center mt-5'>
        <div className='detailProdukImg'>
          <img src={dataDetail?.image} />
        </div>
        <div className='title-detailProduct ms-3' style={{ width: '40%' }} >
          <h2 className='ms-4' style={{ color: '#BD0707' }}>{dataDetail?.tittle}</h2>
          <p className='mt-3 mb-5 ms-4'>{Rp.convert(dataDetail?.price)}</p>
          <div className='list-toping mt-5'>
            <h5>Toping</h5>
            <div className='toping'>
              <Row className='list-toping1'>
                {dataproduct?.map((item, index) => (
                  <Col key={index} className='col-toping'>
                    <div className='d-flex justify-content-center'>
                      <input
                        type="checkbox"
                        className="poppingCheck"
                        style={{ display: "none" }}
                        id={`custom-checkbox-${index}`}
                        checked={checkedState[item.id]}
                        value={item.price}
                        name={item.id}
                        onChange={handleOnchage}
                        hidden />
                      <label htmlFor={`custom-checkbox-${index}`}>
                        <img src={item?.image} style={{ cursor: 'pointer' }} />
                      </label>
                    </div>
                    <p className='mt-1 ms-4  text-center fw-bolder fs-6'>{item?.title}</p>
                    <div hidden>
                      <p>{item?.price}</p>
                    </div>
                  </Col>
                ))}
                <Row className='justify-content-between mb-3 mt-5'>
                  <Col className='col-8 ms-4' style={{ color: '#974A4A' }}><p>Total</p></Col>
                  <Col className='col-2 me-3'>
                    <p className='font-weight-bold fs-6'>{Rp.convert(dataDetail?.price + total)}</p>
                  </Col>
                </Row>
                <Button variant="danger" className='ms-4 mb-5' style={{ width: '92%' }} onClick={(e) => handleSubmit.mutate(e)}>Add Cart</Button>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
