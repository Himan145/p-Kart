import React, { useContext, useEffect, useState } from 'react';
import  Layout  from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import { Prices } from '../components/Prices.js';
import {useNavigate} from 'react-router-dom'
import { CartContext } from '../App.js';
import toast from 'react-hot-toast'



export const HomePage=()=>{
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const [checked,setChecked]=useState([]);
    const [radio,setRadio]=useState([]);
    const [total,setTotal]=useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const {cartval,setCartval}=useContext(CartContext);

    //get total count
    const getTotal=async()=>{
        try{
            const {data}=await axios.get('http://localhost:5000/api/v1/product/product-count');
            setTotal(data?.total);
        }
        catch(err){
            console.log(err);
        }
    }

    //get all products
    const getAllProducts=async()=>{
        try{
            setLoading(true);
            const {data}=await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
            //console.log(JSON.stringify(checked));
        }
        catch(err){
            setLoading(false);
            console.log(err);
        }
    }

    


    //get all category
    const getCategory=async()=>{
        try{
            const {data}=await axios.get('http://localhost:5000/api/v1/category/get-category');
            if(data.success){
                setCategories(data.category);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCategory();
        getTotal();
    },[])
    
    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
          all.push(id);
        } else {
          all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
       if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);
    

    useEffect(() => {
      if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);
    
    const filterProduct = async () => {
        try {
          const { data } = await axios.post("http://localhost:5000/api/v1/product/product-filter", {
            checked,
            radio,
          });
          setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
    }; 
    
    //load more
    useEffect(()=>{
        if(page===1)return;
        loadMore();
    },[page])
    const loadMore=async()=>{
        try{
            setLoading(true);
            const {data}=await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`)
            setLoading(false);
            setProducts([...products,...data.products])
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }
    

    return(
        <Layout title={"p-Kart"}>
            <div className='home-animation'>
                <h1 className='ani-h1'><span></span></h1>
            </div>
            <div className='row gx-3 homepage mt-3'>
                <div className='col-md-2 filter'>
                <div>
                    <h5 className='text-center text-uppercase'>Filter By Category</h5>
                    <div className='d-flex flex-column px-2'>
                    {categories?.map(c=>(
                        <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                            {c.name}
                        </Checkbox>
                    ))}
                    </div>
                </div>
                <div>
                    <h5 className='text-center text-uppercase mt-3'>Filter By Price</h5>
                    <div className='d-flex flex-column px-2'>
                     <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                        {Prices?.map(p=>(
                            <div key={p._id}>
                            <Radio value={p.array}>{p.name}</Radio>
                            </div>
                        ))}
                     </Radio.Group>
                    </div>
                </div>
                <div>
                    <div className='d-flex flex-column px-2'>
                        <button className='btn btn-danger mt-3' onClick={()=>window.location.reload()}>RESET FILTER</button>
                    </div>
                </div>
                </div>
                <div className='col-md-10'>
                    <h1 className='text-center text-uppercase'>All Products</h1>
                    <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
                        {products?.map((p)=>(
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
                                        toast.success("Item add to cart");
                                    }
                                   }
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className='my-1 mb-5 mx-3 p-2'>
                        {products&&products.length<total&&(<button 
                        className='btn btn-success'
                        onClick={(e)=>{e.preventDefault();setPage(page+1);}}
                        >
                            {loading?"Loading...":"Loadmore"}
                        </button>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}