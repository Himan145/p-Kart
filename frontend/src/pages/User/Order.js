import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { UserMenu } from '../../components/Menu/UserMenu';
import axios from 'axios';
import { AppContext } from '../../App';
import moment from 'moment';

export const Order=()=>{
    const [orders,setOrders]=useState([]);
    const {auth}=useContext(AppContext);
    const getOrders=async()=>{
        try{
            const {data}=await axios.get(`p-kart.vercel.app/api/v1/auth/orders/${auth?.user?._id}`);
            setOrders(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getOrders();
    },[auth?.user?._id])
    return(
        <Layout title={'p-Kart All-Orders'}>
            <div className='container-fluid p-3'>
                <div className='row px-2'>
                    <div className='col-md-2 mt-5'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-10 user-orders'>
                        <h1 className='text-center text-uppercase'>All Orders</h1>
                        {orders?.map((o,i)=>{
                        return (
                        <div className='border shadow'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Buyer</th>
                                        <th scope='col'>Payment Status</th>
                                        <th scope='col'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope='row'>{i+1}</th>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{o?.status}</td>
                                        <td>{o?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='container'>
                                {o?.products?.map((p,i)=>(
                                   <div className='row mb-2 p-3 card flex-row'>
                                   <div className='col-md-4'>
                                   <img src={`p-kart.vercel.app/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name} width={"100px"} height={"100px"}/>
                                   </div>
                                   <div className='col-md-8'>
                                       <p>{p.name}</p>
                                       <p>{p.description}</p>
                                       <p>Price: &#8377;{p.price}</p>
                                   </div>
                               </div> 
                                ))}
                            </div>
                        </div>
                        )
                        })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
