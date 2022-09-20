import { React, useState } from 'react'
import { Button,Form,Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../src/config/api';
import { useNavigate } from 'react-router';
// import NavbarAdmin from "./navbarAdmin";
import '../../src/styles/addproduct.css'
import ikonupload from '../../src/assets/img/ikon-upload.png'
import Noimg from '../../src/assets/img/no-photo.jpg'

export default function Editprofile() {

    const moving = useNavigate()
  const moveTodetailAddprofile = () => {
    moving(`/addprofile`)
  }


//   const navigate = useNavigate();

//   const [preview, setPreview] = useState(null)

//   const [form, setForm] = useState({
//         title : '',
//         price : '',
//         image : '',
//     });

    // const handleOnChange = (e) => {
    //   setForm(({
    //         ...form,
    //         [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
    //       }))

    //       if (e.target.type === 'file') {
    //         let url = URL.createObjectURL(e.target.files[0]);
    //         setPreview(url);
    //       }
    //     };

//     const handleOnSubmit = useMutation ( async (e) => {
//       try{
//         e.preventDefault();

//         const config = {
//           headers: {
//             'Content-type': 'multipart/form-data',
//           }
//         };

//         const formData = new FormData();
//         formData.set('title', form.title)
//         formData.set('price', form.price)
//         formData.set('image', form.image[0], form.image[0].name)

//         console.log(form);

//         const response = await API.post('/topping', formData, config)
//         console.log(response);

//         navigate('/add-toping')
//       } catch(error) {
//         const alert = (
//           <Alert variant="danger" className="py-1">
//             Failed
//           </Alert>
//         );
//         console.log(error);
//       } 
//     })
//     console.log(form);
  
    return (
    <>
      <div className='page-add-product justify-content-center'>
        <div className='formPageProduct'>
          <div className='title-product '>
            <h2>EDIT PROFILE</h2>
          </div>
              <div className='form-addProduct ps-4 py-4 '>
                  <Form >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control className='inputProduct' name='title' type="text" placeholder="Name Toping" />
                      </Form.Group>
                      <Form.Group className=" mt-4" controlId="formBasicEmail">
                          <Form.Control className='inputProduct' name='price' type="text" placeholder="Price" />
                      </Form.Group>
                      <Form.Group className="mb-5" >
                            <input
                            type="file"
                            id="upload"
                            name="image"
                        
                            hidden
                            />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={ikonupload}/>
                            </label>
                            <Form.Control className="inputProduct" type="text"placeholder="Photo Product" />
                        </Form.Group>                     
                      <Button className='button-addProduct justify-content-center mt-3' variant="danger" type="submit">
                          Add Toping
                      </Button>
                  </Form>
              </div>
        </div>
            <div className='imgProduct ms-5'>
                <img src={Noimg}/>
            </div>
      </div>
    </>
  )
}
