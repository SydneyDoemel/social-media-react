import React, { Component, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../app.css'
import ImageUpload from '../components/ImageUpload';




export default function CreatePost({user}) {

    const [selectedFile, setSelectedFile] = useState('null');
    const [redirect, setRedirect]=useState(false)
    const [error, setError]=useState(false)
    const sendCreateInfo = async (e) => {
        e.preventDefault();
        try{
        const res = await fetch('http://localhost:5000/api/posts/create', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title: e.target.title.value,
                caption: e.target.caption.value,
                imgUrl: e.target.imgUrl.value
            })
        });
        const data = await res.json();
        console.log(data)
        setRedirect(true)} catch(error){
            setError(true)
        }
    };
  return redirect? <Navigate to='/myfeed'/>:(
    <div className=' d-flex flex-column justify-content-center create-container '>
       <h1 className='my-5 text-center create-post-header '>New Post</h1>
        <form  className='d-flex flex-column mx-4 mb-auto' onSubmit={(e) => {sendCreateInfo(e) }}>

          
                {/* <label className="form-label">Title</label> */}
                <input type="text" className="title-input" name='title' placeholder='Title'/>
          
            
                {/* <label className="form-label">Caption</label> */}
                <input type="text" className="caption-input" name='caption'  placeholder='Caption' maxLength='50'/>
        
          
                {/* <label className="form-label">Image URL</label> */}
                <input type="text" className="img-input"  name='imgUrl'  placeholder='Image Url'/>
                {/* <input type="file" value={selectedFile}  onChange={(e) => setSelectedFile(e.target.files[0])} /> */}
           

            <button type="submit" className="btn btn-primary w-25 mt-3 post-btn">Post</button>
        </form>
    </div>
  )
}
