import React from 'react';
import {useNavigate} from 'react-router-dom'

export const UserMenu=()=>{
    const navigate=useNavigate();
    const handlePro=()=>{
        navigate('/profile')
    }
    const handleOrd=()=>{
        navigate('/orders')
    }
    return(
        <>
            <div className='text-center'>
                <div className='d-flex flex-column user-menu-btn'>
                    <div className='align-items-center justify-content-center mb-5'>
                        <button className='btn btn-primary btn-lg btn-block' onClick={handlePro}>{"Profile ->"}</button>
                    </div>
                    <div className='align-items-center justify-content-center mb-5'>
                        <button className='btn btn-primary btn-lg btn-block' onClick={handleOrd}>{"Orders ->"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
