import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { serverURL } from "../serverUrl";


function UserLogin() {
  
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errMsg,setErrMsg]=useState('')
    const navigate = useNavigate();
    const data = {
        email,
        password
      }
    const handleLogin=(e)=>{
      e.preventDefault()
        if(!email||!password){
            setErrMsg('Enter all the details')
        }else{
          axios.post(`${serverURL}/login`,data).then((response)=>{
            if(response.data.usertoken){
              console.log(response.data.usertoken);
              localStorage.setItem('usertoken',response.data.usertoken)
            }
            console.log('login success');
            let user = true
            let id = response.data.user._id
            let email = response.data.user.email
            let name = response.data.user.name
            let usertoken = response.data.usertoken
            const userData = {
              user,
              id,
              email,
              usertoken,
              name
            }
            console.log(userData);
            localStorage.setItem('userData',JSON.stringify(userData))
            navigate('/home')
          }).catch((err)=>{
            setErrMsg(err.response.data.err)
            
          }) 
     
        }
    }
    useEffect(()=>{
      let user = localStorage.getItem('usertoken')
      if(user){
        navigate('/home')
      }
    })
  return (
    <div>
      <div
        style={{ backgroundColor: "#47bbed" }}
        className="container col-md-4 col-10 mt-5 card card shadow p-5"
      >
        <form onSubmit={handleLogin}>
          <h3 className="text-center fw-bolder text-dark">Sign in</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onClick={() => {
                setErrMsg("");
              }}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onClick={() => {
                setErrMsg("");
              }}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div>
            <p className="text-danger text-center">{errMsg}</p>
          </div>
          <button type="submit" className=" btn btn-dark btn-md btn-block ">
            Sign in
          </button>
          <p className="forgot-password text-right mt-3">
            Doesn't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                navigate("/signup", { replace: true });
              }}
            >
              Please Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default UserLogin;
