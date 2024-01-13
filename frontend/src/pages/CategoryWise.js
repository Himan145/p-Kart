import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import { CartContext } from '../App';

export const CategoryWise=()=>{
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState([]);
    const {cartval,setCartval}=useContext(CartContext);
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(params?.slug)getProductsByCat();
    },[params?.slug])
    const getProductsByCat=async()=>{
        try{
            const {data}=await axios.get(`http://localhost:5000/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
    <Layout title={"p-Kart Category"}>
        <div className='container mt-3 category-wise'>
            <h3 className='text-center'>Category - {category?.name}</h3>
            <div className='row'>
            <div>
                    <div className='d-flex flex-wrap justify-content-evenly align-items-center '>
                        {products?.map((p)=>(
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
                                        setCartval([...cartval,p]);
                                        localStorage.setItem('cartval',JSON.stringify([...cartval,p]));
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
        </div>
    </Layout>
    )
}