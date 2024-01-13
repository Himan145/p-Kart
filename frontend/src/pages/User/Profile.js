import React, { useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import { UserMenu } from '../../components/Menu/UserMenu';
import { AppContext } from '../../App';

export const Profile=()=>{
    const {auth}=useContext(AppContext);
    return(
        <Layout title={'p-Kart Profile'}>
            <div className='container-fluid p-3'>
                <div className='row'>
                    <div className='col-md-2 mt-5'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-10 user-profile'>
                        <h1 className='usp-h1 mt-2'>Name: {auth?.user?.name}</h1>
                        <h3 className='usp-h3 mt-2'>Email: {auth?.user?.email}</h3>
                        <h3 className='usp-h3 mt-2'>Phone: {auth?.user?.phone}</h3>
                        <h3 className='usp-h3 mt-2'>Address: {auth?.user?.address}</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}