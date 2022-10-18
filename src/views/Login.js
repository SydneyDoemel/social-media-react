import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login({ logMeIn }) {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const sendLoginInfo = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/login";

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    if (data.status === "ok") {
      logMeIn(data.data);
    }
  };

  const sendBasicAuth = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${btoa(
            e.target.username.value + ":" + e.target.password.value
          )}`,
        },
      });

      const data = await res.json();

      console.log(data);
      if (data.status === "ok") {
        logMeIn(data.data);
        setRedirect(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return redirect ? (
    <Navigate to="/" />
  ) : (
    <div className=" sign-up-container">
      <h3 className="display-3 pt-4 text-center pb-2">Log In</h3>
      <form
        className="login-form d-flex flex-column mx-5 py-3 justify-content-center"
        onSubmit={(e) => {
          sendBasicAuth(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" name="username" />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" />
        </div>

        <button type="submit" className="btn btn-signin mt-3 w-50">
          Log In
        </button>
      </form>
    </div>
  );
}
