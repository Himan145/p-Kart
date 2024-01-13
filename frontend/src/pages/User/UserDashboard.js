import React from 'react';
import Layout from '../../components/Layout/Layout';
import { UserMenu } from '../../components/Menu/UserMenu';

export const UserDashboard=()=>{
    return(
        <Layout title={'p-Kart User-Menu'}>
            <div className='container-fluid user-dash'>
                <UserMenu/>
            </div>
        </Layout>
    )
}