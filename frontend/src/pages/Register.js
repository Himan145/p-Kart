import React from 'react';
import Layout from '../components/Layout/Layout';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const Register=()=>{
    const [name,setName]= useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('p-kart.vercel.app/api/v1/auth/register',{name,email,password,phone,address})
        .then(res=>{
            console.log(res);
            navigate('/login');
        })
        .catch(err=>{console.log(err)})
    }
    return(
        <Layout title={"p-Kart Register"}>
            <div className='register register-page'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-2'>
                        </div>
                        <div className='col-md-8 border shadow'>
                        <form onSubmit={handleSubmit}>
                        <h1 className='text-uppercase text-center mt-3'>Register Here</h1>
                        <div className='m-3'>
                           <input type='text' placeholder='Enter Your Name' className='form-control' id='nameId' onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='Enter Email' className='form-control' id='emailId' onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='Enter Password' className='form-control' id='passwordId' onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='Enter Phone Number' className='form-control' id='phoneId' onChange={(e)=>setPhone(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='Enter Your Address' className='form-control' id='addressId' onChange={(e)=>setAddress(e.target.value)} required/>
                        </div>
                        <button type="submit" className='btn btn-primary reg-btn btn-lg mb-3'>Register</button>
                        </form>
                        </div>
                        <div className='col-md-2'>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
