import React, { useState, useEffect } from 'react'

import Contact from './views/Contact'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'
// import ToDoList from './views/ToDoList'
import UpdatePost from './views/UpdatePost'
import SinglePost from './views/SinglePost'
// import Shop from './views/Shop'

import Post from './components/Post'
import ImageUploading from './components/ImageUpload'
import ImageUpload from './components/ImageUpload'
import Profile from './views/Profile'
import MyPosts from './views/MyFeed'
import MyFeed from './views/MyFeed'
import ViewUserProfile from './views/ViewUserProfile'
import Comments from './components/Comment'

import CommentBox from './components/CommentBox'
import Comment from './components/Comment'
import CommentForm from './components/CommentForm'

// import Cart from './views/Cart'

export default function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     cart: []
  //   }
  // }
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };


  const [user, setUser] = useState(getUserFromLocalStorage())
  const [cart, setCart] = useState([])

  // logMeIn = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }

  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  // const addToCart = (product) => {
  //   setCart([...cart, product])
  // }

  // const removeFromCart = (product) => {
  //   const newCart = [...cart]
  //   for (let i=cart.length-1; i>=0; i--){
  //     if (product.id == cart[i].id){
  //       newCart.splice(i, 1)
  //       break
  //     }
  //   }
  //   setCart(newCart)
  // }

  // const getCart = async (user) => {
  //   if (user.token){
  //     const res = await fetch('http://localhost:5000/api/cart', {
  //       method: "GET",
  //       headers: {Authorization: `Bearer ${user.token}`}
  //     });
  //     const data = await res.json();
  //     console.log(data)
  //     if (data.status==='ok'){
  //       setCart(data.cart)
  //     }
  //     else{
  //      setCart([]) 
  //     }
  //   }
  //   else{
  //     setCart([]) 
  //   }
  // };

  // useEffect(()=>{
  //   getCart(user)
  // }, [user])


  return (
    <BrowserRouter>
      <div className='app'>
        <Nav user={user} logMeOut={logMeOut}/>


        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/contact' element={<Contact />} />
          {/* <Route path='/news' element={<News />} /> */}
          <Route path='/' element={<IG user={user}/>} />
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/posts/create' element={<CreatePost user={user} />} />
          <Route path='/posts/update/:postId' element={<UpdatePost user={user} />} />
          <Route path='/posts/:postId' element={<SinglePost user={user} />} />
          <Route path='/post' element={<Post currentUser={user} />} />
        
          <Route path='/imgup' element={<ImageUpload currentUser={user} />} />
          <Route path='/profile' element={<Profile user={user} />} />
          <Route path='/myfeed' element={<MyFeed user={user} />} />
          <Route path='/posts/user/:userId' element={<ViewUserProfile user={user} />} />
          
          <Route path='/commentbox' element={<CommentBox user={user} />} />
          
          
          {/* <Route path='/todo' element={<ToDoList />} /> */}
          {/* <Route path='/shop' element={<Shop addToCart={addToCart} user={user}/>} /> */}
          {/* <Route path='/shop/:productId' element={<SingleProduct />} /> */}
          {/* <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} user={user}/>} /> */}
        </Routes>


      </div>
    </BrowserRouter>
  )

}