import React, { useEffect, useState } from 'react';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Products=()=>{
    const [products,setProducts]=useState([]);
    //get products
    const getAllProducts=async()=>{
        try{
            const {data}=await axios.get('p-kart.vercel.app/api/v1/product/get-product');
            setProducts(data.products);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])
    return(<div>
        <Layout title={"p-Kart All-Products"}>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9 admin-products'>
                <h1 className='text-center text-uppercase'>All Products List</h1>
                <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                {products?.map((p)=>(
                    <div className='card m-2' style={{width:"18rem"}}>
                        <Link key={p._id} to={`/admin/update-products/${p.slug}`} className='product-link'>
                        <img src={`p-kart.vercel.app/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name}/>
                        <div className='card-body'>
                            <h5 className='card-title'>{p.name}</h5>
                            <p className='card-text'>{p.description.substring(0,25)}</p>
                        </div>
                        </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
        </Layout>
    </div>)
}
