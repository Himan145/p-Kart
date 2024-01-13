import React from 'react';
import  Layout  from '../components/Layout/Layout';

export const Policy=()=>{
    return(
        <Layout title={"p-Kart Policy"}>
            <div className='policy d-flex flex-column'>
                <div className='mt-3'>
                    <h1 className='text-center'><b>p-Kart</b> Policies</h1>
                </div>
                <div className='m-2'>
                    <h3>1. Shipping Policy</h3>
                    <div className='mx-2'>
                        <h5>Shipping Methods and Rates</h5>
                        <p>We offer a variety of shipping options and rates depending on your location and the items in your order. Please refer to our Shipping Policy for detailed information.</p>
                    </div>
                    <div className='mx-2'>
                        <h5>Order Processing Time</h5>
                        <p>Orders are typically processed within [X] business days. You will receive a confirmation email with tracking information once your order has been shipped.</p>
                    </div>
                </div>
                <div className='m-2'>
                    <h3>2. Return & Exchange Policy</h3>
                    <div className='mx-2'>
                        <h5>Eligibility</h5>
                        <p>We want you to be satisfied with your purchase. Please review our Return & Exchange Policy to understand eligibility criteria, return procedures, and any associated fees.</p>
                    </div>
                    <div className='mx-2'>
                        <h5>Defective or Damaged Items</h5>
                        <p>If you receive a defective or damaged item, please contact our customer support within [X] days of receiving your order for assistance.</p>
                    </div>
                </div>
                <div className='m-2'>
                    <h3>3. Privacy Policy</h3>
                    <div className='mx-2'>
                        <h5>Information Collection</h5>
                        <p>We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and secure your personal information.</p>
                    </div>
                    <div className='mx-2'>
                        <h5>Cookies</h5>
                        <p>By using our website, you agree to the use of cookies. Learn more about our cookie practices in our Cookie Policy.</p>
                    </div>
                </div>
                <div className='m-2'>
                    <h3>4. Terms of Service</h3>
                    <div className='mx-2'>
                        <p>Please read our Terms of Service carefully before using our website. It outlines the terms and conditions governing your use of our site and services.</p>
                    </div>
                </div>
                <div className='m-2'>
                    <h3>5. Payment & Security</h3>
                    <div className='mx-2'>
                        <h5>Payment Options</h5>
                        <p>We accept various payment methods for your convenience. Learn more about our accepted payment options in our Payment & Security Policy.</p>
                    </div>
                    <div className='mx-2'>
                        <h5>Security Measures</h5>
                        <p>Your payment information is secure with us. Read about the security measures we employ in our Payment & Security Policy.</p>
                    </div>
                </div>
                <div className='m-2'>
                    <h3>6. Updates to Policies</h3>
                    <div className='mx-2'>
                        <p>We reserve the right to update our policies periodically. Check this page for the latest information.</p>
                    </div>
                </div>
                <div className='m-3'>
                    <p className='text-center'>Thank you for choosing <b>p-Kart</b>. We appreciate your trust and look forward to serving you.</p>
                </div>
            </div>
        </Layout>
    )
}