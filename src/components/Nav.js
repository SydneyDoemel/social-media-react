import React from 'react';
import { Link } from 'react-router-dom';
import { List } from "phosphor-react";

export default function Nav({user, logMeOut}) {
  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"><List size={32} color='white'/></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">Explore</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/commentbox">Comments</Link>
          </li>
          
      

          {user.username ?
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Hello, {user.username}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts/create">Create Post</Link>
              </li>
              <li className="nav-item">
            <Link className="nav-link" to="/myfeed">myfeed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
              <li className="nav-item" onClick={logMeOut}>
                <Link className="nav-link" to="/login">Log Out</Link>
              </li>
            </>
            :
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
              
            </>
          }
        
        </ul>
  
      </div>
    </div>
  </nav>
  )
}
