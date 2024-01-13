import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { CartContext, SearchContext } from '../App';
import {useNavigate} from 'react-router-dom';

export const Search=()=>{
    const {searchval}=useContext(SearchContext);
    const {cartval,setCartval}=useContext(CartContext);
    const navigate=useNavigate();
    return(
        <Layout title={'Search results'}>
            <div className='container search-page'>
                <div className='text-center'>
                    <h1 className='text-uppercase'>Search Results</h1>
                    <h4 className='mb-3'>
                        {searchval?.result.length<1?"No Products Found":`Found ${searchval?.result.length}`}
                    </h4>
                    <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                        {searchval?.result.map((p)=>(
                            <div className='card m-2' style={{width:"18rem"}}>
                            <img src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`} className='card-img-top' alt={p.name}/>
                            <div className='card-body'>
                                <h5 className='card-title'>{p.name}</h5>
                                <p className='card-text'>{p.description.substring(0,25)}</p>
                                <p className='card-text'>&#8377;{p.price}</p>
                                <button className='btn btn-primary mx-1' onClick={()=>navigate(`/productdetails/${p.slug}`)}>More Details</button>
                                <button 
                                className='btn btn-secondary'
                                onClick={
                                    ()=>{
                                        setCartval([...cartval,p]);
                                        localStorage.setItem('cartval',JSON.stringify([...cartval,p]));
                                    }
                                   }
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}