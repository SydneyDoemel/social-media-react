import React, { useEffect, useState } from 'react'
import Post from '../components/Post';

export default function MyFeed({user}) {
    const [posts, setPosts]=useState([])
 
    const getPosts = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/myfeed/${user.id}`);
        const data = await res.json();
        console.log(data.posts)
        const post_lst=data.posts
        console.log(post_lst)
        setPosts(post_lst)
        
    }
    const showPosts = () => {
       
        
        return posts.map((p,i)=><Post  key={i} postInfo={p} user={user}/>)
    }
   
    useEffect(()=>{
       
        getPosts()
        
    },[])
  return (
    <div className=' myfeed-container'>
        <div className=''>
            <div className='my-feed-posts w-100'>
            {showPosts()}
            
            </div>
        
        </div>

    </div>
  )
}
