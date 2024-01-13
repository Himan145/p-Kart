import React from 'react';
import  Layout  from '../components/Layout/Layout';

export const About=()=>{
    return(
        <Layout title={"p-Kart About"}>
            <div className='about d-flex flex-column'>
                <div className='p-3'>
                    <h1>ABOUT US</h1>
                    <p>Welcome to <b>p-Kart</b> – Your Ultimate Destination for [Your Product/Service].</p>
                </div>
                <div className='px-3'>
                    <h1>OUR STORY</h1>
                    <p>At <b>p-Kart</b>, we believe in [core belief or mission statement]. Founded in 2018, our journey began with a passion for your product/service and a commitment to customer satisfaction, quality, etc.</p>
                </div>
                <div className='px-3 py-2'>
                    <h1>WHAT SETS US APART?</h1>
                    <div>
                       <h3>Quality Assurance</h3>
                       <p>We take pride in offering only the finest product/service. Our team of dedicated professionals ensures that each product meets the highest standards of quality and craftsmanship.</p>
                    </div>
                    <div>
                        <h3>Customer-Centric Approach</h3>
                        <p>Your satisfaction is our priority. We strive to provide an exceptional shopping experience, from browsing our website to receiving your order at your doorstep. Our customer support team is always ready to assist you.</p>
                    </div>
                    <div>
                        <h3>Sustainability</h3>
                        <p>We are committed to environmental sustainability, ethical sourcing, etc. Discover a range of products that not only meet your needs but also contribute to a better, more sustainable future.</p>
                    </div>
                </div>
                <div className='px-3'>
                    <h1>OUR TEAM</h1>
                    <p>Meet the faces behind <b>p-Kart</b>. Our diverse team is passionate to give good quality of service and dedicated to delivering excellence.</p>
                    <h5>Founder and CEO: Himan Biswas</h5>
                    <h5>Head of Operations: Himan Biswas</h5>
                    <h5>Customer Support Team: p-Kart Supporter</h5>
                </div>
            </div>
        </Layout>
    )
}