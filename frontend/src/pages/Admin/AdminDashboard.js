import React from 'react';
import Layout from '../../components/Layout/Layout';
import { AdminMenu } from '../../components/Menu/AdminMenu';

export const AdminDashboard=()=>{
    return(
        <Layout title={'p-Kart Admin-menu'}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <AdminMenu/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}