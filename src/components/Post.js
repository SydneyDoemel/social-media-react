import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comment";
import CommentBox from "./CommentBox";

export default function Post({ postInfo, user }) {
  const [following, setfollowing] = useState([]);
  const getfollowing = async () => {
    const res = await fetch(`http://localhost:5000/api/following/${user.id}`);
    const data = await res.json();
    console.log(data);
    let fol2 = data.following[0];
    setfollowing(fol2);
  };
  const followUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_id: e.target.user1_id.value,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const deletePost = async (post_id) => {
    const res = await fetch(
      `http://localhost:5000/api/posts/delete/${post_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //     post_id: e.target.user1_id.value,
        // })
      }
    );
    const data = await res.json();
    console.log(data);
  };

  const showFollowers = () => {};

  return (
    <div className="container post-container pt-3">
      <div className="card my-3">
        <div className="card-header d-flex">
          <div className="me-auto ">
            <Link to={`/posts/user/${postInfo.user_id}`}>
              <h4 className="user-handle">@{postInfo.author}</h4>
            </Link>
          </div>
          <div>
            {postInfo.user_id === user.id ? (
              <>
                <Link to={`/posts/update/${postInfo.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link><button onClick={() => { deletePost(postInfo.id); }} className="btn btn-del ms-3" >
                  Delete
                </button>
              </> ) : (<>
              <form onSubmit={(e) => { followUser(e); }} >
                  <input type="hidden" name="user1_id" defaultValue={postInfo.user_id} />
                  <button type="submit" className="btn btn-follow">
                    Follow
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
          <div className="flex-card-big">
            {postInfo.img_url ? (
              <>
                <Link to={`/posts/${postInfo.id}`}></Link>
               <div className="img-wrapper"> <img src={postInfo.img_url} className="card-img-top" alt="..." /></div> 
              </>
            ) : (
              <></>
            )}
            <div className="card-body">
              <h5 className="card-title">{postInfo.title}</h5><p className="card-caption">{postInfo.caption}</p> 
              
            </div>
          </div>
          <div className="card-footer">
              <CommentBox user={user}/>
              </div>
      </div>
    </div>
  );
}
