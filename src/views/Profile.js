import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function Profile({ user }) {
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getPosts = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/user/${user.id}`);
    const data = await res.json();
    console.log(data.posts);
    const post_lst = data.posts;
    console.log(post_lst);
    setPosts(post_lst);
  };
  const showPosts = () => {
    return posts.map((p, i) => <Post key={i} postInfo={p} user={user} />);
  };

  useEffect(() => {
    getPosts();
  }, []);
  const getfollowers = async () => {
    const res = await fetch(`http://localhost:5000/api/followers/${user.id}`);
    const data = await res.json();
    console.log(data);
    let fol = data.followers;
    setfollowers(fol);
  };
  const getfollowing = async () => {
    const res = await fetch(`http://localhost:5000/api/following/${user.id}`);
    const data = await res.json();
    console.log(data);
    let fol2 = data.following;
    setfollowing(fol2);
  };
  const unfollowUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/unfollow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unfollow: e.target.unfollow.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    getfollowing();
  };
  useEffect(() => {
    getfollowers();
    getfollowing();
  }, []);
  return (
    <>
      <div className="profile-container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Followers
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Following
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="d-flex flex-column mx-auto mt-5 ig-cont">
              {showPosts()}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {" "}
            <div className="d-flex justify-content-center text-center">
              <ul className="list-group mt-4 w-75">
                {followers.map((p, i) => {
                  return (
                    <Link to={`/posts/user/${p[1]}`}>
                      <li className="list-group-item text-center">{p[0]}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="d-flex justify-content-center text-center">
              <ul className="list-group mt-5 w-75 ">
                {following.map((p, i) => {
                  return (
                    <li className="d-flex flex-row list-group-item ">
                      <Link to={`/posts/user/${p[1]}`} className="me-auto">
                        <p className="">@{p[0]}</p>
                      </Link>
                      <form onSubmit={(e) => unfollowUser(e)}>
                        <button
                          type="submit"
                          className="btn btn-sm btn-outline-danger   unfollow"
                        >
                          unfollow
                        </button>
                        <input
                          type="hidden"
                          name="unfollow"
                          defaultValue={p[0]}
                        />
                      </form>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
