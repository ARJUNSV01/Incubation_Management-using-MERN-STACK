import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { serverURL } from "../serverUrl";

function UserSignUp() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[errMsg,setErrMsg]=useState('')
    const navigate = useNavigate();
    const data = {
        name,
        email,
        password
      }
    
    const handleRegister = (e) =>{
        e.preventDefault()
        if(!email||!password||!name||!confirmPassword){
            setErrMsg('Enter all the details')
        }if(password.length <6){
          setErrMsg('Enter minimum 6 characters for password' )
        }if(password!==confirmPassword){
          setErrMsg('Passwords should be same')
        }else{ 
            axios.post(`${serverURL}/signup`,data).then((response) => {
                console.log('signupSuccess')
                if(response.data.status==='ok'){
                  navigate('/')
                }
              }).catch((err)=>{
                setErrMsg('This User Already Exists')
              })
        }
    }

  return (
    <div>
      <div className="container col-md-4 col-10 mt-5 card card shadow bg-warning p-5">
        <form onSubmit={handleRegister}>
          <h3 className="text-center fw-bolder text-success">Sign up</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onClick={() => {
                setErrMsg("");
              }}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="First name"
            />
          </div>
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
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="confirmPassword"
              value={confirmPassword}
              onClick={() => {
                setErrMsg("");
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Password Again"
            />
          </div>
          <div>
            <p className="text-danger text-center">{errMsg}</p>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right mt-3">
            Already registered?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            >
              Please Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default UserSignUp;
