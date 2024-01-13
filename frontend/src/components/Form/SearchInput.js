import React, { useContext } from 'react';
import { SearchContext } from '../../App';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const SearchInput=()=>{
    const {searchval,setSearchval}=useContext(SearchContext);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.get(`p-kart.vercel.app/api/v1/product/search/${searchval.keyword}`)
            setSearchval({...searchval,result:data})
            navigate('/search');
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className='mt-1'>
            <form className='d-flex' role='search' onSubmit={handleSubmit}>
                <input
                 className='form-control me-2'
                 type='search'
                 placeholder='Search'
                 aria-label="Search"
                 value={searchval.keyword}
                 onChange={(e)=>setSearchval({...searchval,keyword:e.target.value})}
                />
                <button className='btn btn-outline-dark mx-2' type="submit">Search</button>
            </form>
        </div>
    )
}
