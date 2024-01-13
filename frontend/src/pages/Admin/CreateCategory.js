import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import axios from 'axios';
import { CategoryForm } from '../../components/Form/CategoryForm';
import {Modal} from 'antd';


export const CreateCategory=()=>{
    const [categories,setCategories]=useState([]);
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
    },[])

    const [name,setName]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/v1/category/create-category',{name});
            getCategory();
        }
        catch(err){
            console.log(err);
        }
    }

    const [visible,setVisible]=useState(false);
    const [selected,setSelected]=useState(null);
    const [updatedName,setUpdatedName]=useState("");

    //update category
    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`,{name:updatedName});
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getCategory();
        }
        catch(err){
            console.log(err);
        }
    }

    //delete category
    const handleDelete=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${id}`,{name:updatedName});
            getCategory();
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <Layout title={'p-Kart create-category'}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9 admin-category'>
                    <h1 className='text-center text-uppercase'>Manage Category</h1>
                    <div className='py-3'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} change={'Add'}/>
                    </div>
                    <div className=' bg-secondary'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Edit</th>
                                    <th scope='col'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(c=>(
                                    <tr>
                                        <td key={c._id}>{c.name}</td>
                                        <td>
                                            <button 
                                            className='btn btn-primary'
                                            onClick={()=>{
                                                setVisible(true);
                                                setUpdatedName(c.name);
                                                setSelected(c);
                                            }}
                                            >Edit</button>
                                        </td>
                                        <td><button className='btn btn-primary' onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} change={'Update'}/>
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}