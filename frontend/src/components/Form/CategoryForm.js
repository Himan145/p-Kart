import React from 'react';

export const CategoryForm=({handleSubmit,value,setValue,change})=>{
    return (
        <>
           <form onSubmit={handleSubmit}>
               <div className='row mb-3'>
                <div className='col-9'>
                <input type='text' className='form-control' placeholder='Enter new category' value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                </div>
                <div className='col-3'>
                <button type='submit' className='btn btn-primary'>{change}</button>
                </div>
               </div>
           </form>
        </>
    )
}