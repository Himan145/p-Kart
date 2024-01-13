import React from 'react';
import  Layout  from '../components/Layout/Layout';

export const Contact=()=>{
    return(
        <Layout title={"p-Kart Contact"}>
            <div className='contact d-flex flex-column'>
                <div className='mt-5'>
                    <h1 className='text-center'>CONTACT US</h1>
                    <h4 className='mx-5'>Have a question or need assistance? Our friendly customer support team is here to help.</h4>
                </div>
                <div className='m-5'>
                    <h3>Phone : +07 8880000493</h3>
                    <h3>Email : pkart.official.org@gmail.com</h3>
                </div>
            </div>
        </Layout>
    )
}