//import useState hook to create menu collapse state
import React, { useContext, useState } from "react";


//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaBook, FaUserLock } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./AdminDashboard.css"
import { AdminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
 function AdminSideBar(){
   const navigate=useNavigate()
   const{admin,setAdmin}=useContext(AdminContext)
     
    const [menuCollapse, setMenuCollapse] = useState(true);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
     return(
         <div>
            <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p className="pt-3">{menuCollapse ? <FaUserLock/> : "ADMIN PANEL"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem onClick={()=>{navigate('/admin/dashboard')}} active={true} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem onClick={()=>{navigate('/admin/recordlist')}} icon={<FaList />}>Record Track</MenuItem>
              <MenuItem onClick={()=>{navigate('/admin/bookingslots')}} icon={<FaBook />}>Book slots</MenuItem>
              {/* <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu onClick={(()=>{
                localStorage.removeItem('admintoken')
                setAdmin('')
                navigate('/admin')
              })} iconShape="square">
              <MenuItem  icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
         </div>
     )
 }
 export default AdminSideBar