import React, { useEffect, useState, useContext} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "../src/pages/main";
import Cart from "./customer/cart"
import AddProduct from "./pages/admin/addProduct";
import AddToping from "./pages/admin/addToping";
import IncomeTransaction from "./pages/admin/IncomeTransaction";
import DetailProduct from './customer/detailProduct'
import DataDrink from "./components/DataDummy/DataDrink";
import Login from "./pages/authModal";
import Home from "./pages/landing";
import Profile from './customer/profile'
import Addprofile from './customer/addprofile'
import Editprofile from './customer/editprofile'
import { Usercontext } from "./context/user-context";
import { API, setAuthToken } from './config/api'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(Usercontext)

 useEffect(() => {
   if (state.isLogin == false) {
     navigate('/');
   } else {
     if (state.user.status == 'admin') {
      navigate('/admin');
     } else if (state.user.status == 'customer') {
       navigate('/main');
     }
   }
 }, [state]);

 const checkUser = async () => {
   try {
     const response = await API.get('/check-auth')

     if (response.status === 404) {
       return dispatch({
         type: 'AUTH_ERROR',
       });
     }

     let payload = response.data.data;
     payload.token = localStorage.token;

     dispatch({
       type: 'USER_SUCCESS',
       payload,
     });
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   checkUser();
 }, []);
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/main' element={<Main/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/addprofile' element={<Addprofile/>}/>
        <Route exact path='/editprofile' element={<Editprofile/>}/>
        {/* <Route exact path='/listproduct' element={<ListProduct/>}/> */}
        <Route exact path='/add-drink' element={<AddProduct/>}/>
        <Route exact path='/add-toping' element={<AddToping/>}/>
        <Route exact path='/add-toping' element={<AddToping/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/admin' element={<IncomeTransaction/>}/>
        <Route exact path='/detail-drink/:id' element={< DetailProduct data ={DataDrink}/>}/>
     </Routes>
    </>
  );
}

export default App