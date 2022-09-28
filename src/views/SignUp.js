import React, { Component, useState } from 'react'
import { Navigate } from 'react-router-dom';

export default function SignUp() {
    const [redirect, setRedirect]= useState(false)
    const [error, setError]= useState(false)
    const sendSignUpInfo = async (e) => {
        try{
            e.preventDefault();
            
    
            if (e.target.password.value !== e.target.confirmPassword.value){ // making sure the password AND confirm password match
                this.setState({message: true})
                return
            }
    
            const res = await fetch('http://127.0.0.1:5000/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                })
            });
            const data = await res.json();
            console.log(data)
            setRedirect( true)} catch(error) {
                setError(true);
            }
            
    };

  return redirect ? <Navigate to="/login"/>:(
    <div className='container sign-up-container'>
        <h3 className='display-3 pt-4 text-center pb-2'>Sign Up</h3>
    <form className='d-flex flex-column mx-5 py-3 justify-content-center' onSubmit={(e)=>{sendSignUpInfo(e)}}>

    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
        <input type="text" className="form-control" name='username'/>
    </div>


    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email'/>
      
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name='password'/>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='confirmPassword'/>
    </div>
    
    <button type="submit" className="btn btn-signin mt-3 w-50">Submit</button>
</form>
</div>
  )
}
