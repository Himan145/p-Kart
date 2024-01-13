import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { CartContext } from '../App';

export const ProductDetais=()=>{
    const params=useParams();
    const [product,setProduct]=useState({});
    const [relatedProducts,setRelatedProducts]=useState([]);
    const navigate=useNavigate();
    const {cartval,setCartval}=useContext(CartContext);
    useEffect(()=>{
        if(params?.slug)getProduct();
    },[params?.slug])
    const getProduct=async()=>{
        try{
            const {data}=await axios.get(`http://localhost:5000/api/v1/product/get-single-product/${params.slug}`);
            setProduct(data?.product);
            console.log(data.product._id);
            console.log(data.product.category);
            getSimilarProduct(data?.product?._id,data?.product?.category?._id);
        }
        catch(err){
            console.log(err);
        }
    }
    //get similar product
    const getSimilarProduct=async(pid,cid)=>{
        try{
            const {data}=await axios.get(`http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products);
        }
        catch(err){
            console.log(err);
        }
    }
    return(<Layout title={"p-Kart ProductDetails"}>
        <div className='product-details'>
            <div className='row container mt-3'>
                <div className='col-md-6 pt-5'>
                <img src={`http://localhost:5000/api/v1/product/get-photo/${product?._id}`} className='card-img-top' alt={product?.name} height={"500px"} width={"500px"}/> 
                </div>
                <div className='col-md-6'>
                    <h1 className='text-center text-uppercase'>Product Details</h1>
                    <h4>Name: {product?.name}</h4>
                    <h4>Description: {product?.description}</h4>
                    <h4>Price: &#8377;{product?.price}</h4>
                    <h4>Category: {product?.category?.name}</h4>
                    <button 
                    className='btn btn-secondary ms-1'
                    onClick={
                        ()=>{
                            setCartval([...cartval,product]);
                            localStorage.setItem('cartval',JSON.stringify([...cartval,product]));
                        }
                       }
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <h2 className='text-uppercase text-center'>Similar Products</h2>
                <div className='d-flex flex-wrap '>
                        {relatedProducts?.map((p)=>(
                            <div className='card m-2' style={{width:"18rem"}}>
                            <img src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name}/>
                            <div className='card-body'>
                                <h5 className='card-title'>{p.name}</h5>
                                <p className='card-text'>{p.description.substring(0,25)}</p>
                                <p className='card-text'>&#8377;{p.price}</p>
                                <button className='btn btn-primary mx-1' onClick={()=>navigate(`/productdetails/${p.slug}`)}>More Details</button>
                                <button 
                                className='btn btn-secondary'
                                onClick={
                                    ()=>{
                                        setCartval([...cartval,product]);
                                        localStorage.setItem('cartval',JSON.stringify([...cartval,product]));
                                    }
                                   }
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
            </div>
        </div>
    </Layout>)
}