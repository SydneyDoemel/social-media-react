import React, { Component, useEffect, useState } from 'react'
import Post from '../components/Post';
import { Link } from 'react-router-dom';


export default function IG({user}) {
    const [posts, setPosts]=useState([])

   
    const getPosts = async () => {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        setPosts(data.posts)
    }
    const showPosts = () => {
        // return posts.map(p=><Link key={p.id} to={`/posts/${p.id}`}><Post postInfo={p} user={user}/></Link>)
        return posts.map(p=><Post  key={p.id} postInfo={p} user={user}/>)
    }
    useEffect(()=>{
        getPosts()
    },[])
  return (
    <div className='ig-container'>
        
            <div className='ig-cont'>
            {showPosts()}
            </div>

    </div>
  )
}
