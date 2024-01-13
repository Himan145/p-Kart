import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { AppContext, CartContext} from '../App';
import {Link,useNavigate} from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';


export const CartPage=()=>{
    const {cartval,setCartval}=useContext(CartContext);
    const {auth}=useContext(AppContext);
    const [clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();


    //total cost of item
    const totalPrice=()=>{
        try{
            let total=0;
            cartval?.map(item=>{total+=item.price})
            return total;
        }
        catch(err){
            console.log(err);
        }
    }
    //remove cart item
    const removeCartItem=(pid)=>{
        try{
            let myCart=[...cartval];
            let index=myCart.findIndex(item=>item._id===pid)
            myCart.splice(index,1);
            setCartval(myCart);
            localStorage.setItem('cartval',JSON.stringify(myCart));
        }
        catch(err){
            console.log(err);
        }
    }

    //get payment gateway token
    const getToken=async()=>{
        try{
            const {data}=await axios.get('https://p-kart.vercel.app/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getToken();
    },[auth?.token]);

    const handlePayment=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const {nonce}=await instance.requestPaymentMethod();
            const user=auth.user;
            await axios.post('https://p-kart.vercel.app/api/v1/product/braintree/payment',{nonce,cartval,user});
            setLoading(false);
            localStorage.removeItem('cartval');
            setCartval([]);
            navigate(`/orders`);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return(
    <Layout title={"p-Kart Cart-Item"}>
        <div className='container cart-page '>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mt-3'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h3 className='text-center'>
                        {cartval?.length>=1 ? `You have ${cartval.length} items in your cart ${auth?.token?"":"Please login to checkout"}`:`Your cart is Empty`}
                    </h3>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                   {
                    cartval?.map(p=>(
                        <div className='row mb-2 p-3 card flex-row'>
                            <div className='col-md-4'>
                            <img src={`https://p-kart.vercel.app/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name} width={"100px"} height={"100px"}/>
                            </div>
                            <div className='col-md-8'>
                                <p>{p.name}</p>
                                <p>{p.description}</p>
                                <p>Price: &#8377;{p.price}</p>
                                <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
                            </div>
                        </div>
                    ))
                   } 
                </div>
                <div className='col-md-4'>
                    <h2 className='text-center'>Cart Summary</h2>
                    <p className='text-center'>Total | Checkout | Payment</p>
                    <hr/>
                    <h4>Total : &#8377;{totalPrice()}</h4>
                    {!auth?.token && cartval.length>=1?(<Link className='btn btn-primary' to={"/login"}>Login to Checkout</Link>):("")}
                    {!auth?.token?(""):(
                    <div className='mt-2'>
                       {!clientToken || !cartval?.length?(
                        ""
                       ):(
                        <>
                           <DropIn
                           options={{authorization:clientToken,paypal:{flow:'vault'}}}
                           onInstance={instance=>setInstance(instance)}
                           />
                           <button className='btn btn-primary' onClick={handlePayment}>{!loading?"Make Payment":"Processing"}</button>
                        </>
                       )}
                    </div>
                    )}
                </div>
            </div>
        </div>
    </Layout>)
}
