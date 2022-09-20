import { React, useState } from 'react'
import { Button,Form,Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { useNavigate } from 'react-router';
import NavbarAdmin from "./navbarAdmin";
import '../../styles/addproduct.css'
import ikonupload from '../../assets/img/ikon-upload.png'
import Noimg from '../../assets/img/no-photo.jpg'

export default function AddToping() {

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null)

  const [form, setForm] = useState({
        title : '',
        price : '',
        image : '',
    });

    const handleOnChange = (e) => {
      setForm(({
            ...form,
            [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
          }))

          if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
        };

    const handleOnSubmit = useMutation ( async (e) => {
      try{
        e.preventDefault();

        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          }
        };

        const formData = new FormData();
        formData.set('title', form.title)
        formData.set('price', form.price)
        formData.set('image', form.image[0], form.image[0].name)


        const response = await API.post('/topping', formData, config)

        navigate('/add-toping')
      } catch(error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        console.log(error);
      } 
    })
  
    return (
    <>
    <NavbarAdmin/>
      <div className='page-add-product justify-content-center'>
        <div className='formPageProduct'>
          <div className='title-product '>
            <h2>Toping</h2>
          </div>
              <div className='form-addProduct ps-4 py-4 '>
                  <Form onSubmit={ (e) => handleOnSubmit.mutate(e)}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control className='inputProduct' name='title' type="text" onChange={handleOnChange} placeholder="Name Toping" />
                      </Form.Group>
                      <Form.Group className=" mt-4" controlId="formBasicEmail">
                          <Form.Control className='inputProduct' name='price' type="text" onChange={handleOnChange} placeholder="Price" />
                      </Form.Group>
                      <Form.Group className="mb-5" >
                            <input
                            type="file"
                            id="upload"
                            name="image"
                            onChange={handleOnChange}
                            hidden
                            />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={ikonupload}/>
                            </label>
                            <Form.Control className="inputProduct" type="text" value={preview} placeholder="Photo Product" />
                        </Form.Group>                     
                      <Button className='button-addProduct justify-content-center mt-3' variant="danger" type="submit">
                          Add Toping
                      </Button>
                  </Form>
              </div>
        </div>
            <div className='imgProduct ms-5'>
                <img src={preview || Noimg}/>
            </div>
      </div>
    </>
  )
}
