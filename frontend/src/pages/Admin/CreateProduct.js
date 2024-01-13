import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import axios from 'axios';
import {Select} from 'antd';
import {useNavigate} from 'react-router-dom';

const {Option}=Select;

export const CreateProduct=()=>{
    const [categories,setCategories]=useState([]);
    const [photo,setPhoto]=useState("");
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [price,setPrice]=useState();
    const [quantity,setQuantity]=useState();
    const [shipping,setShipping]=useState("");
    const [category,setCategory]=useState({});
    const navigate=useNavigate();

    //get all category
    const getCategory=async()=>{
        try{
            const {data}=await axios.get('http://localhost:5000/api/v1/category/get-category');
            if(data.success){
                setCategories(data.category);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCategory();
    },[])

    //handle create
    const handleCreate=async(e)=>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping",shipping);
            axios.post(
                "http://localhost:5000/api/v1/product/create-product",
                productData
            )
            .then(res=>{
                console.log(res);
                navigate("/admin/products");
            })
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <Layout title={'p-Kart create-product'}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9 admin-create-prod border shadow'>
                    <h1 className='text-center text-uppercase mt-2'>Create Product</h1>
                    <div className="mt-1">
                       <Select
                          bordered={false}
                          placeholder="Select a category"
                          size="large"
                          showSearch
                          className="form-select mb-3"
                          onChange={(value) => {
                          setCategory(value);
                          }}
                       >
                       {categories?.map((c) => (
                          <Option key={c._id} value={c._id}>
                            {c.name}
                          </Option>
                       ))}
                       </Select>
                       <div className="mb-3">
                          <label className="btn btn-outline-secondary col-md-12">
                            {photo ? photo.name : "Upload Photo"}
                            <input
                              type="file"
                              name="photo"
                              accept="image/*"
                              onChange={(e) => setPhoto(e.target.files[0])}
                              hidden
                            />
                          </label>
                       </div>
                       <div className="mb-3">
                           {photo && (
                           <div className="text-center">
                              <img
                                src={URL.createObjectURL(photo)}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                              />
                           </div>
                           )}
                       </div>
                       <div className="mb-3">
                           <input
                              type="text"
                              value={name}
                              placeholder="write a name"
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                               type="text"
                               value={description}
                               placeholder="write a description"
                               className="form-control"
                               onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                               type="number"
                               value={price}
                               placeholder="write a Price"
                               className="form-control"
                               onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                               type="number"
                               value={quantity}
                               placeholder="write a quantity"
                               className="form-control"
                               onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Select
                               bordered={false}
                               placeholder="Select Shipping "
                               size="large"
                               showSearch
                               className="form-select mb-3"
                               onChange={(value) => {
                                 setShipping(value);
                               }}
                            >
                              <Option value="0">No</Option>
                              <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary cre-pro-btn" onClick={handleCreate}>
                              CREATE PRODUCT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}