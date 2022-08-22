import React, { useContext, useEffect } from "react"
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function UserProcessing(){
    const { setUser} = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const user = decodeToken(token);
    //   console.log("user", user);
      if (!user) {
        localStorage.removeItem("usertoken");
        navigate("/");
      } else {
        setUser(user.name);
    
      }
    } else {
      navigate("/");
    }
  }, []);
    
    return(
        <div>
          <h1 style={{marginTop:'3%'}} align='center' >Thanks for your application</h1>          
    <h1 style={{marginTop:'3%',color:'orange'}} align='center' >Your request is being  Proccessed</h1>  
        </div>
    )
}
export default UserProcessing;