import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "../styles/styles.css"
export default function UpdatePost({ user }) {

    // use state always return the state variable and a function to setState
    const [post, setPost] = useState({})
    const { postId } = useParams()


    const sendUpdates = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/api/posts/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({
                title: e.target.title.value,
                caption: e.target.caption.value,
                imgUrl: e.target.imgUrl.value,
                postId: postId
            })
        });
        const data = await res.json();
        console.log(data)
    }
    

    

    const getSinglePost = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        const data = await res.json();
        if (data.status === 'ok'){
            setPost(data.post)
        }
    };

    // useEffect take in two arguments
    // function to run, and an array of dependecies
    // useEffect does not return anything.
    // to mimic a componentDidMount, your array should be empty
    useEffect(()=>{
        getSinglePost()
    }, [])



    return (
        <div className=' d-flex flex-column justify-content-center align-items-center mx-auto update-container'>
        <h1 className='my-5 text-center create-post-header '>Update Post</h1>
        <form className='mx-4 mb-auto' onSubmit={(e) => { sendUpdates(e) }}>

            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name='title' defaultValue={post.title}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Caption</label>
                <input type="text" className="form-control" name='caption' defaultValue={post.caption}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input type="text" className="form-control" name='imgUrl' defaultValue={post.img_url}/>
            </div>

            <button type="submit" className="btn btn-primary update">Submit</button>
        </form>
        </div>
    )
}
