import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Menu/AdminMenu';
import axios from 'axios';

export const Users=()=>{
    const [users,setUsers]=useState([]);
    const AllUsers=async()=>{
        try{
            const {data}=await axios.get('p-kart.vercel.app/api/v1/auth/all-users');
            setUsers(data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        AllUsers();
    },[])
    return(
        <Layout title={'p-Kart All-Users'}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9 admin-users'>
                    <h1 className='text-center mb-3'>ALL USERS</h1>
                        <div className='border shadow'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Phone</th>
                                        <th scope='col'>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((u,i)=>{
                                        return(
                                            <tr>
                                                <th scope='row'>{i+1}</th>
                                                <td>{u?.name}</td>
                                                <td>{u?.email}</td>
                                                <td>{u?.phone}</td>
                                                <td>{u?.address}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </Layout>
    )
}
