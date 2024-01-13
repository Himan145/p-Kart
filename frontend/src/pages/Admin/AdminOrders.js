import React, { useState ,useEffect} from 'react';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import moment from 'moment';

export const AdminOrders=()=>{
    const [orders,setOrders]=useState([]);
    const getOrders=async()=>{
        try{
            const {data}=await axios.get(`https://p-kart.vercel.app/api/v1/auth/all-orders`);
            setOrders(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getOrders();
    },[])
    return(
        <Layout title={"p-Kart All-orders"}>
           <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9 admin-orders'>
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
                                   <img src={`https://p-kart.vercel.app/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name} width={"100px"} height={"100px"}/>
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
        </Layout>
    )
}
