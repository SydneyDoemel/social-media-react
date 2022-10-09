import React, { Component, useEffect, useState } from 'react'
import Post from '../components/Post';
import { Link, useNavigate } from 'react-router-dom';


export default function IG({user}) {
    const [posts, setPosts]=useState([])
    const [searchid, setsearchid]=useState()
    const navigate = useNavigate();
   
    const getPosts = async () => {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();
        setPosts(data.posts)
    }
    const showPosts = () => {
        // return posts.map(p=><Link key={p.id} to={`/posts/${p.id}`}><Post postInfo={p} user={user}/></Link>)
        return posts.map(p=><Post  key={p.id} postInfo={p} user={user}/>)
    }
    const getUserId=async(user_name)=>{
      const res = await fetch(`http://localhost:5000/api/userid/${user_name}`);
        const data = await res.json();
        return data.id
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const search_user=e.target.search.value;
      const id = await getUserId(search_user)
      navigate(`/posts/user/${id}`)
    }
    useEffect(()=>{
        getPosts()
    },[])
  return (
    <div className='ig-container'>
        <h4 className='display-4 text-center p-5 explore-header'>Explore</h4>
        <form className='d-flex my-4 justify-content-center
        ' role='search' onSubmit={handleSubmit}>
                    <input placeholder="Search for a user..." className='form-control w-50 me-3' type='search' name='search'/>
                    <button className='btn btn-outline-success me-3 '>Search</button>
                </form>
            <div className='ig-cont'>
            {showPosts()}
            </div>

    </div>
  )
}
