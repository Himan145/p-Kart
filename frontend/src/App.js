import './App.css';
import {Routes,Route} from 'react-router-dom';
import { HomePage } from './pages/HomePage.js';
import {About} from './pages/About.js';
import {Contact} from './pages/Contact.js';
import { Pagenotfound } from './pages/Pagenotfound.js';
import { Policy } from './pages/Policy.js';
import { Register } from './pages/Register.js';
import { Login } from './pages/Login.js';
import {Forgot} from './pages/Forgot.js'
import { createContext, useEffect, useState } from 'react';
import { AdminDashboard } from './pages/Admin/AdminDashboard.js';
import { CreateCategory } from './pages/Admin/CreateCategory.js';
import { CreateProduct } from './pages/Admin/CreateProduct.js';
import { Users } from './pages/Admin/Users.js';
import { UserDashboard } from './pages/User/UserDashboard.js';
import { Profile } from './pages/User/Profile.js';
import { Order } from './pages/User/Order.js';
import { Products } from './pages/Admin/Products.js';
import { UpdateProduct } from './pages/Admin/UpdateProduct.js';
import { Search } from './pages/Search.js';
import { ProductDetais } from './pages/ProductDetails.js';
import { Categories } from './pages/Categories.js';
import { CategoryWise } from './pages/CategoryWise.js';
import { CartPage } from './pages/CartPage.js';
import { AdminOrders } from './pages/Admin/AdminOrders.js';

export const AppContext=createContext();
export const SearchContext=createContext();
export const CartContext=createContext();

function App() {
  const [auth,setAuth]=useState({
    user:null,
    token:""
  })
  const [searchval,setSearchval]=useState({
    keyword:"",
    result:[]
  })
  const [cartval,setCartval]=useState([]);
  useEffect(()=>{
    const data=localStorage.getItem('auth')
    if(data){
      const parseData=JSON.parse(data)
      setAuth({
        ...auth,
        user:parseData.user,
        token:parseData.token
      });
    }
    //eslint-disable-next-line
  },[]);
  useEffect(()=>{
    const existingItem=localStorage.getItem('cartval');
    if(existingItem){
      setCartval(JSON.parse(existingItem));
    }
  },[])

  return (
    <>
    <AppContext.Provider value={{auth,setAuth}}>
      <SearchContext.Provider value={{searchval,setSearchval}}>
      <CartContext.Provider value={{cartval,setCartval}}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/admin-page' element={<AdminDashboard/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
        <Route path='/admin-users' element={<Users/>}/>
        <Route path='/admin-orders' element={<AdminOrders/>}/>
        <Route path='/user-page' element={<UserDashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/admin/products' element={<Products/>}/>
        <Route path='/admin/update-products/:slug' element={<UpdateProduct/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/productdetails/:slug' element={<ProductDetais/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:slug' element={<CategoryWise/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
      </CartContext.Provider>
      </SearchContext.Provider>
    </AppContext.Provider>
    </>
  );
}

export default App;
