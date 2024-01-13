import React, { useContext } from 'react';
import { NavLink,Link } from 'react-router-dom';
import { AppContext, CartContext } from '../../App.js';
import { SearchInput } from '../Form/SearchInput.js';
import { useCategory } from '../../hooks/useCategory.js';

export const Header=()=>{
  const {auth,setAuth}=useContext(AppContext);
  const categories=useCategory();
  const {cartval}=useContext(CartContext);

  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth');
  }

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <Link to="/" className="navbar-brand">
                    <img src={require('../../images/shopping-cart-309592_640.png')} alt='logo' height={"50px"} width={"50px"}/>
                  </Link>
                  <Link to="/" className="navbar-brand logo-title">p-Kart</Link>
                  <ul className="navbar-nav ms-auto mb-0 mb-lg-0 text-uppercase">
                    <SearchInput/>
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link " aria-current="page">Home</NavLink>
                    </li>
                    {/* dropdown menu */}
                    <li className='nav-item dropdown'>
                      <Link to={'/categories'} className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' area-expanded='false'>Categories</Link>
                      <ul className='dropdown-menu'>
                        <li>
                          <Link to={`/categories`} className='dropdown-item'>ALL CATEGORY</Link>
                        </li>
                        {categories.map((c)=>(
                          <li>
                            <Link to={`/category/${c.slug}`} className='dropdown-item'>{c.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {
                        !auth.user?(<>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">SignUp</NavLink>
                            </li>
                            <li className="nav-item">
                               <NavLink to="/login" className="nav-link">LogIn</NavLink>
                            </li>
                        </>):(
                        <>
                            <li className="nav-item">
                               <NavLink to="/login" className="nav-link" onClick={handleLogout}>LogOut</NavLink>
                            </li>
                            
                            {
                              auth.user.email==='admin@admin'?(<>
                                <li className='nav-item dropdown'>
                                   <Link to={'/admin-page'} className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' area-expanded='false'>Admin</Link>
                                   <ul className='dropdown-menu'>
                                     <li>
                                       <Link to={`/admin-page`} className='dropdown-item'>ADMIN MENU</Link>
                                     </li>
                                     <li>
                                       <Link to={`/create-category`} className='dropdown-item'>CREATE CATEGORY</Link>
                                     </li>
                                     <li>
                                       <Link to={`/create-product`} className='dropdown-item'>CREATE PRODUCT</Link>
                                     </li>
                                     <li>
                                       <Link to={`/admin/products`} className='dropdown-item'>PRODUCTS</Link>
                                     </li>
                                     <li>
                                       <Link to={`/admin-users`} className='dropdown-item'>USERS</Link>
                                     </li>
                                     <li>
                                       <Link to={`/admin-orders`} className='dropdown-item'>ORDERS</Link>
                                     </li>
                                   </ul>
                                </li>
                              </>):(<>
                                <li className='nav-item dropdown'>
                                   <Link to={'/user-page'} className='nav-link dropdown-toggle' role='button' data-bs-toggle='dropdown' area-expanded='false'>{auth.user.name}</Link>
                                   <ul className='dropdown-menu'>
                                     <li>
                                       <Link to={`/user-page`} className='dropdown-item'>USER MENU</Link>
                                     </li>
                                     <li>
                                       <Link to={`/profile`} className='dropdown-item'>PROFILE</Link>
                                     </li>
                                     <li>
                                       <Link to={`/orders`} className='dropdown-item'>ORDERS</Link>
                                     </li>
                                   </ul>
                                </li>
                              </>)
                            }
                            
                        </>
                    )
                    }
                    <li className="nav-item">
                      <NavLink to="/cart" className="nav-link">Cart {cartval?.length}</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

        </>
    )
}