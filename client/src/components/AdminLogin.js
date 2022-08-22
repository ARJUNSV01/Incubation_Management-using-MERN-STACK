import React, { useState } from "react";
import axios from 'axios';
import { serverURL } from "../serverUrl";
import {useNavigate} from 'react-router-dom'
function AdminLogin(){
    const navigate = useNavigate()
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[errMsg,setErrMsg]=useState('')
    const data = {
        email,
        password
    }
    const loginAdmin=(e)=>{
        e.preventDefault()
        if(!email || !password){
            setErrMsg('Enter all the details')
        }else{
            axios.post(`${serverURL}/admin/login`,data).then((response)=>{
            if(response.data.admintoken){
              localStorage.setItem('admintoken',response.data.admintoken)  
            }
            let admin = true
            let id = response.data.admin._id
            let email = response.data.admin.email
            let name = response.data.admin.name
            let admintoken = response.data.admintoken
            const adminData = {
              admin,
              id,
              email,
              admintoken,
              name
            }
            localStorage.setItem('adminData',JSON.stringify(adminData))
            navigate('/admin/dashboard')
            }).catch((err)=>{
                setErrMsg(err.response.data.err)
            })
        }
    }
    return(
        <div>
           <div className="container col-md-4 col-10 mt-5 card card shadow p-5">
<form onSubmit={loginAdmin}>

<h3 className="text-center text-success">Log in</h3>

<div className="form-group mb-4 mt-4">
    {/* <label>Email</label> */}
    <input type="email" value={email} onClick={()=>{setErrMsg('')}} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" required="true"/>
</div>

<div className="form-group mb-4 mt-4">
    {/* <label>Password</label> */}
    <input type="password" value={password} onClick={()=>{setErrMsg('')}} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter password" required="true" />
</div>


<div>
          <p className="text-danger text-center">{errMsg}</p>
        </div>
<button type="submit" className=" btn btn-dark btn-md btn-block ">Sign in</button>

</form>
        </div>
        </div>
    )
}
export default AdminLogin;