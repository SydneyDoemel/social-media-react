import React, { useState, useEffect } from 'react'


import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'
import UpdatePost from './views/UpdatePost'
import SinglePost from './views/SinglePost'
import Post from './components/Post'
import ImageUpload from './components/ImageUpload'
import Profile from './views/Profile'
import MyFeed from './views/MyFeed'
import ViewUserProfile from './views/ViewUserProfile'
import CommentBox from './components/CommentBox'



export default function App() {
  
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };


  const [user, setUser] = useState(getUserFromLocalStorage())




  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }


  return (
    <BrowserRouter>
      <div className='app'>
        <Nav user={user} logMeOut={logMeOut}/>


        <Routes>
          
        
          
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
          
          
        </Routes>


      </div>
    </BrowserRouter>
  )

}