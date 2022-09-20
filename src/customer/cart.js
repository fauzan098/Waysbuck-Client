import { React, useState, useEffect } from 'react'
import NavbarUser from './navbarUser'
import "../styles/cart.css"
import { API } from '../config/api'
import Icecoffepalmsugar from "../assets/img/icecoffepalmsugar.png"
import Basket from "../assets/img/basket.svg"
import Rp from "rupiah-format"
import { useMutation } from 'react-query';
import DataDelete from '../components/DataDelete'
import { useNavigate } from 'react-router'

export default function Cart() {

    let Navigate = useNavigate()

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [dataCart, setDataCart] = useState([]);

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

    let total = 0
    dataCart.forEach((item) => {
        total += item?.sub_amount
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/cart/${id}`);
        } catch (error) {
            console.log(error);
        }
    })

    useEffect(() => {
        if (confirmDelete) {
            handleClose();
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

    const data = {
        status: "pending",
        amount: total
    };

    const handleSubmit = useMutation(async (e) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const body = JSON.stringify(data);
        const response = await API.patch("/transaction", body, config);
        const token = response.data.data.token;

        window.snap.pay(token, {
            onSuccess: function (result) {
                console.log(result);
                Navigate("/profile");
            },
            onPending: function (result) {
                console.log(result);
            },
            onError: function () {
                alert("you closed the popup without finishing the payment");
            },
        });
    })

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidTransClientKey = "SB-Mid-client-49m3vzngAw0Kbs8L"

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidTransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <>
            <NavbarUser plusOne={dataCart.length} />
            <div className='cart mt-4' style={{ width: '90%' }}>
                <h2 className='mb-5 text-danger'>My Cart</h2>
                <h4 className='text-danger' > Review Your Order</h4>
                <div className='d-flex justify-content-center'>
                    <div >
                        <hr />
                        {/* mapping here */}
                        {dataCart.map((item, index) => (
                            <div className='left' key={index}>
                                <div className='d-flex justify-content-between mb-2'>
                                    <div className='d-flex justify-content-start'>
                                        <img className='img-cart' src={item.product?.image} />
                                        <div className='ms-2 d-flex '>
                                            <div className='me-5'>
                                                <p className='title-drink'>{item.product?.title}</p>
                                                <div className='d-flex' style={{ width: '550px' }}>
                                                    <p className='toping me-1'>Toping : </p>
                                                    {item.topping.map((topping, idx) => (
                                                        <p key={idx} className='text-danger'>{topping?.title}, </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='price me-3'>
                                        <div className='d-flex ms-4'>
                                            <p>Price : {item.sub_amount} </p>
                                            <p className='ms-2'>{ }</p>
                                        </div>
                                        <img className='ms-5' src={Basket} onClick={() => { handleDelete(item.id) }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <hr />
                    </div>
                    <div className='rigth-side col-4 .d-inline-flex'>
                        <hr />
                        <div class="row mb-3">
                            <div class="col">
                                <span className='text-danger fs-6 fw-normal'>Sub Total</span>
                            </div>
                            <div class="col text-danger fw-normal">
                                <p className='float-end'>{Rp.convert(total)}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <span className='text-danger fs-6 fw-normal'>Qty</span>
                            </div>
                            <div class="col text-danger fw-normal">
                                <p className='float-end'>{dataCart.length}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col">
                                <span className='text-danger fs-6 fw-normal'>Total</span>
                            </div>
                            <div class="col text-danger fw-normal">
                                <p className='float-end'>{Rp.convert(total)}</p>
                            </div>
                        </div>

                        <div className='col mt-5' >
                            <button type="button" class="btn btn-danger" onClick={ (e) => handleSubmit.mutate(e)} style={{ width: '100%' }}>Pay</button>
                        </div>
                    </div>
                </div>
            </div>
            < DataDelete
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}
