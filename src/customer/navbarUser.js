import { React, useContext } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import logowaysbuck from '../assets/img/logowaysbuck.png'
import Imgkeranjang from '../assets/img/imgkeranjang.png'
import ProfilePhoto from '../assets/img/profilephoto.png'
import Logout from '../assets/img/logout1.svg'
import User from '../assets/img/user.svg'
import { Usercontext } from '../context/user-context';
import '../styles/style.css'


export default function NavbarUser({plusOne}) {
    const [ state, dispatch ] = useContext(Usercontext)
    const logout = () => {
      console.log(state);
      dispatch({
        type: 'LOGOUT'
      })
      moving('/')
    }
    const photoProfile = <img className='imgProfile' src={ProfilePhoto}/> 
    const logo = <img src={ProfilePhoto}/> 

    const moving = useNavigate()
    const moveToCart = () => {
      moving('/cart')
    }
    const moveTomain = () => {
      moving('/main')
    }
  return (
  <>
  <div className='navbar ms-5'   >
        <span class="plusone badge rounded-circle bg-danger" 
        style={{
          position:"absolute",
          top:"39px",
          right:"145px",
          width: "2rem"}}> 
                {plusOne}
              <span class="visually-hidden"></span> 
          </span>
    <div className='ms-4 mt-2'>
        <img src={logowaysbuck}style={{cursor:'pointer'}} onClick={moveTomain}/>
    </div>
        <div className='d-flex me-3'>
            <img className='profile-photo float-right-end me-4 mt-3' src={Imgkeranjang} onClick={moveToCart} style={{cursor:'pointer'}} />
            <NavDropdown className='me-3' title={photoProfile} >
                <NavDropdown.Item onClick={ () => moving('/profile')}>
                  <div className='d-flex'>
                    <img src={User}style={{cursor:'pointer'}}/>
                    <p className='mt-3 ms-3 me-5'>Profile</p>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={ logout }>
                  <div className='d-flex'>
                    <img src={Logout}style={{cursor:'pointer'}}/>
                    <p className='mt-3 ms-3 me-5 fw-normal'>Logout</p>
                  </div>
                </NavDropdown.Item>
            </NavDropdown>
        </div>
    </div>
  </>
  )
}
