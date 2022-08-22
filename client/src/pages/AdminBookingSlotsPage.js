import React from "react";
import AdminBookingSlots from "../components/AdminBookingSlots";
import AdminSideBar from "../components/AdminSideBar";

function AdminBookingSlotsPage(){
    return(
        <div>
           <div className="m-0" style={{height:'60px',backgroundColor:"black",position:'sticky',top:0,zIndex:'100000'}}>
           <p className="text-white d-flex justify-content-end fw-bolder fs-3 me-5 pt-2">BOOK SLOTS</p>
           </div>
<div className="row">
          <div className="col-3 col-lg-2">
        <AdminSideBar/>
          </div>
          <div className="col-9 col-lg-10 mt-5">
        <AdminBookingSlots/>
          </div>
        </div>
        </div>
    )
}
export default AdminBookingSlotsPage;