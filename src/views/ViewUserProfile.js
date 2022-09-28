import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

export default function ViewUserProfile({user}) {
    const [posts, setPosts]=useState([])
    const [user_name, setUser_name]=useState()
    const { userId } = useParams()
    const getPosts = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/user/${userId}}`);
        const data = await res.json();
        console.log(data.posts)
        const post_lst=data.posts
        console.log(post_lst)
        setPosts(post_lst)
        const users_name= post_lst[0].author 
        setUser_name(users_name)
        
    }
    const showPosts = () => {
       
        // return posts.map(p=><Link key={p.id} to={`/posts/${p.id}`}><Post postInfo={p} user={user}/></Link>)
        return posts.map((p,i)=><Post  key={i} postInfo={p} user={user}/>)
    }
   const showUsername = ()=>{
    
    return (
      <><h6>{posts[0].author}</h6></>
    )
   }
    useEffect(()=>{
       
        getPosts()
        
    },[])
  return (
    <div>
      <h4>User: {user_name}</h4>
       <div>
        {showPosts()}
       </div>
    </div>
  )
}
