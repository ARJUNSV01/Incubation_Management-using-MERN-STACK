import React from "react";
import AdminSideBar from "../components/AdminSideBar";
import RecordTrack from "../components/RecordTrack";

function RecordTrackPage(){
    return(
        <div>
           <div className="m-0" style={{height:'60px',backgroundColor:"black",position:'sticky',top:0,zIndex:'100000'}}>
           <p className="text-white d-flex justify-content-end fw-bolder fs-3 me-5 pt-2">RECORD LIST</p>
           </div>
<div className="row">
          <div className="col-3 col-lg-2">
        <AdminSideBar/>
          </div>
          <div className="col-8 col-lg-9">
        <RecordTrack/>
          </div>
        </div>
        </div>
    )
}
export default RecordTrackPage;