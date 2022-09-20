import { React, useContext } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import logowaysbuck from '../../assets/img/logowaysbuck.png'
import ProfilePhoto from '../../assets/img/profile.png'
import ProfilePhoto1 from '../../assets/img/profilephoto.png'
import Group from '../../assets/img/Group.svg'
import Logout from '../../assets/img/logout1.svg'
import Topping1 from '../../assets/img/topping1.svg'
import { Usercontext } from '../../context/user-context'


// styling css
import "../../styles/style.css"

export default function NavbarAdmin() {

  const [state, dispatch] = useContext(Usercontext)

  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
    moving('/')
  }
  
    const photoProfile = <img className='imgProfile' src={ProfilePhoto1}/> 
    
    const moving = useNavigate()
    const moveToadmin = () => {
      moving('/admin')
    }
  return (
  <>
  <div className='navbar ms-5 me-5'>
    <div className='ms-5 mt-2'>
        <img className='img-logo' src={logowaysbuck} onClick={moveToadmin} style={{cursor:'pointer'}} />
    </div>
        <div className='d-flex me-5 float-right-end'>
            <NavDropdown 
              style={{
                borderRadius:"80px",
                width:"50px",
                height:"50px"}} title={photoProfile}>
                <NavDropdown.Item onClick={() => moving('/add-drink')}>
                  <div className='d-flex'>
                    <img src={Group}/>
                    <p className='mt-3 ms-3 me-5'>Add Product</p>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => moving('/add-toping')}>
                  <div className='d-flex'>
                    <img src={Topping1}style={{cursor:'pointer'}}/>
                    <p className='mt-3 ms-3 me-5'>Add Topping</p>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
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
