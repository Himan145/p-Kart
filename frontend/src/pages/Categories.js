import React from 'react';
import Layout from '../components/Layout/Layout';
import { useCategory } from '../hooks/useCategory';
import { Link } from 'react-router-dom';

export const Categories=()=>{
    const categories=useCategory();
    return(
    <Layout title={"p-Kart Categories"}>
        <div className='container all-category'>
            <div className='row'>
                {categories.map((c)=>(
                    <div className='col-md-6' key={c._id}>
                        <Link to={`/category/${c.slug}`} className='btn btn-primary btn-lg cat-btn'>{c.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
    )
}