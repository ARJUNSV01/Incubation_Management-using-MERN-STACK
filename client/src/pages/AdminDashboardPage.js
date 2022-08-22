import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
function AdminDashboardPage(){
    return(
        <div>
        
        <div className="m-0" style={{height:'60px',backgroundColor:"black",position:'sticky',top:0,zIndex:'100000'}}>
            <p className="text-white d-flex justify-content-end fw-bolder fs-3 me-5 pt-2">DASHBOARD</p>
        </div>
        <div className="row">
          
            {/* <div style={{display:"flex"}}> */}
                <div className="col-3 col-lg-2">
                <AdminSideBar/>
                </div>
                <div className="col-8 col-lg-9">
                <AdminDashboard/>
                </div>
            {/* </div> */}
 
            {/* <div className="col-2 col-md-4">
               <AdminSideBar/>
               </div>
               <div className="col-10 col-md-8">
               <AdminDashboard/> 
            </div>    */}
             
            </div>
            
        </div>
    )
}
export default AdminDashboardPage;