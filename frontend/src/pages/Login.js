import React from 'react';
import Layout from '../components/Layout/Layout';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../App.js';

export const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {auth,setAuth} =useContext(AppContext);

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
        const res=await axios.post('p-kart.vercel.app/api/v1/auth/login',{email,password})
        if(res && res.data.success){
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
            })
            localStorage.setItem("auth",JSON.stringify(res.data));
            window.alert(res.data.message);
            navigate('/');
        }
        else{
            window.alert(res.data.message);
        }
        }
        catch(err){
            console.log(err);
        }
        
    }
    return(
        <Layout title={"p-Kart Login"}>
            <div className='login'>
                <div className='container register-page'>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6 border shadow'>
                        <form onSubmit={handleLogin}>
                        <h1 className='text-uppercase text-center mt-3'>Login Here</h1>
                        <div className='m-3'>
                           <input type='text'placeholder='Email' value={email} className='form-control' id='L-emailId' onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>
                        <div className='m-3'>
                           <input type='text' placeholder='Password' value={password} className='form-control' id='L-passwordId' onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div>
                        <button type='submit' className='btn btn-primary reg-btn btn-lg mb-3'>LogIn</button>
                        </div>
                        <div>
                        <button type='button' className='btn btn-primary reg-btn btn-lg mb-3' onClick={()=>{navigate('/forgot')}}>Forgot Password</button>
                        </div>
                        </form>
                        </div>
                        <diV className='col-md-3'></diV>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
