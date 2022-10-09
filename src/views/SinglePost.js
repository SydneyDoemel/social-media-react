import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useParams, Link } from 'react-router-dom';
import "../styles/styles.css"

export default function SinglePost({ user }) {
    const { postId } = useParams()
    const [ post, setPost ] = useState({})

    const getSinglePost = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await res.json();
        if (data.status === 'ok'){
            setPost(data.post)
        }
    };

    useEffect(()=>{
        getSinglePost()
    }, [])

  return (
    <div>
        <Post user={user} postInfo = {post}/>


        {post.user_id===user.id?
        <>
            <Link to={`/posts/update/${postId}`}>
                <button>Update</button>
            </Link>
            <button>Delete</button>
        </>
        :
        ''    }
        

    </div>
  )
}
