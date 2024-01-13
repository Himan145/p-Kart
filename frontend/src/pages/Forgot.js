import React, {useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const Forgot=(e)=>{
    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const navigate=useNavigate();

    const handleForgot=async(e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/v1/auth/forgot',{email,newPassword})
        .then(res=>{
            if(res.data.success){
                window.alert(res.data.message);
                navigate('/login');
            }
            else{
                window.alert(res.data.message);
            }
        })
        .catch(err=>console.log(err));
    }
    return (
        <Layout title={"p-Kart Forgot-Password"}>
            <div className='forgot'>
                <div className='container register-page'>
                   <div className='row'>
                      <div className='col-md-3'></div>
                      <div className='col-md-6 border shadow'>
                         <form onSubmit={handleForgot}>
                            <h1 className='text-uppercase text-center mt-3'>Reset Password</h1>
                            <div className='m-3'>
                              <input type='text' placeholder='Email' className='form-control' id='L-emailId' onChange={(e)=>setEmail(e.target.value)} required/>
                            </div>
                            <div className='m-3'>
                              <input type='text'placeholder='New Password' className='form-control' id='L-passwordId' onChange={(e)=>setNewPassword(e.target.value)} required/>
                            </div>
                            <div>
                              <button type='submit' className='btn btn-primary reg-btn btn-lg mb-3'>Reset</button>
                            </div>
                         </form>
                      </div>
                      <div className='col-md-3'></div>
                   </div>
                </div>
            </div>
        </Layout>
    )
}