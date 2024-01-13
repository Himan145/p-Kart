import React from 'react';
import { NavLink } from 'react-router-dom';

export const AdminMenu=()=>{
    return(
        <>
            <div className='text-center'>
                <div className='d-flex flex-column admin-menu-btn'>
                    <div className='align-items-center justify-content-center mb-5'>
                       <NavLink to="/create-category" className="btn btn-primary btn-lga">{"Create Category ->"}</NavLink>
                    </div>
                    <div className='align-items-center justify-content-center mb-5'>
                       <NavLink to="/create-product" className="btn btn-primary btn-lga">{"Create Product ->"}</NavLink>
                    </div>
                    <div className='align-items-center justify-content-center mb-5'>
                       <NavLink to="/admin/products" className="btn btn-primary btn-lga">{"Products ->"}</NavLink>
                    </div>
                    <div className='align-items-center justify-content-center mb-5'>
                       <NavLink to="/admin-users" className="btn btn-primary btn-lga">{"Users ->"}</NavLink>
                    </div>
                    <div className='align-items-center justify-content-center mb-5'>
                       <NavLink to="/admin-orders" className="btn btn-primary btn-lga">{"All Orders ->"}</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
