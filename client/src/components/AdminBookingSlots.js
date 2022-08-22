import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../serverUrl";
import { Modal, Button,Form } from "react-bootstrap";

import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

function AdminBookingSlots() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [slotA, setSlotA] = useState([]);
  const [slotB, setSlotB] = useState([]);
  const [slotC, setSlotC] = useState([]);
  const [slotD, setSlotD] = useState([]);
  const [slotE, setSlotE] = useState([]);
  const [company, setCompany] = useState([]);
  const [slotId, setSlotId] = useState("");
  const[selectedCompany,setSelectedCompany]=useState('')
  const [errMsg,setErrMsg] = useState('')
  const [refresh , setRefresh] = useState('')

  const selectSlot = () =>{
    if(selectedCompany === ''){
        setErrMsg('Please select a Company')
    }else{
        handleClose()
        const data = {
        _id:slotId,
        company:selectedCompany 
        }
        axios.post(`${serverURL}/admin/selectcompany`,data).then((response)=>{
            console.log(response);
            setRefresh(response)
            setCompany([])
            setSelectedCompany('')
        })
    }
  }
useEffect(()=>{
const token = localStorage.getItem('admintoken')
const admin = decodeToken(token)
if(!admin){
    navigate('/admin')
}
},[])
  useEffect(() => {
    axios
      .get(`${serverURL}/admin/getslots`)
      .then(async (response) => {
        setSlotA(response.data.A);
        setSlotB(response.data.B);
        setSlotC(response.data.C);
        setSlotD(response.data.D);
        setSlotE(response.data.E);
        axios
          .get(`${serverURL}/admin/newapplication`)
          .then((response) => {
            console.log(response.data.approved, "hi");
            setCompany(response.data.approved);
          })
          .catch((err) => {
            console.log(err);
          });
          
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <div className="p-5 mt-5">
      <p className="text-primary fw-bold fs-1">BOOKING SLOTS</p>
        <div className="row d-flex justify-content-end">
        <div className="p-0 m-0 col-1" style={{height:"2em",width:"2em",backgroundColor:"#fcba03"}}></div> 
        <p className="col-1 fw-bold">Available</p>
        </div>
        <div className="row d-flex justify-content-end">
        <div className="p-0 m-0 col-1" style={{height:"2em",width:"2em",backgroundColor:"#416e31"}}></div> 
        <p className="col-1 fw-bold">Booked</p>
        </div>
          
        
      <div className="row mt-5">
        {slotA.map((slot) => {
          return (
            <div
              style={{
                height: "7.5em",
                backgroundColor: slot.selected ? "#416e31" : "#fcba03",
              }}
              onClick={!slot.selected ? ()=>{
                handleShow()
                setSlotId(slot._id)} : ""}

              className="col-5 col-lg-1 mb-3 me-3"
            ></div>
          );
        })}
      </div>
      <hr style={{ height: "6px" }} className="hrline" />
      <hr style={{ height: "6px" }} className="hrline " />
      <div className="row mt-5">
        {slotB.map((slot) => {
          return (
            <>
              <div
             style={{
                    height: "7.5em",
                    backgroundColor: slot.selected ? "#416e31" : "#fcba03",
                  }}
                className="col-5  col-lg-1  mb-3 ms-2 me-2"
                onClick={!slot.selected ? ()=>{
                    handleShow()
                    setSlotId(slot._id)} : ""}
              ></div>
              <div
                style={{
                  borderLeft: "4px solid black",
                  width: "0px",
                  padding: 0,
                  margin: 0,
                }}
              ></div>
            </>
          );
        })}
      </div>
      <div className="row">
        {slotC.map((slot) => {
          return (
            <>
              <div
               style={{
                height: "7.5em",
                backgroundColor: slot.selected ? "#416e31" : "#fcba03",
              }}
                className="col-5  col-lg-1  mb-3 ms-2 me-2"
                onClick={!slot.selected ? ()=>{
                    handleShow()
                    setSlotId(slot._id)} : ""} 
              ></div>
              <div
                style={{
                  borderLeft: "4px solid black",
                  width: "0px",
                  padding: 0,
                  margin: 0,
                }}
              ></div>
            </>
          );
        })}
      </div>
      <div className="row">
        {slotD.map((slot) => {
          return (
            <>
              <div
                style={{
                    height: "7.5em",
                    backgroundColor: slot.selected ? "#416e31" : "#fcba03",
                  }}
                className="col-5  col-lg-1 mb-3 ms-2 me-2"
                onClick={!slot.selected ? ()=>{
                    handleShow()
                    setSlotId(slot._id)} : ""}
              ></div>
              <div
                style={{
                  borderLeft: "4px solid black",
                  width: "0px",
                  padding: 0,
                  margin: 0,
                }}
              ></div>
            </>
          );
        })}
      </div>
      <div className="row">
        {slotE.map((slot) => {
          return (
            <>
              <div
                style={{
                    height: "7.5em",
                    backgroundColor: slot.selected ? "#416e31" : "#fcba03",
                  }}
                className="col-5  col-lg-1  mb-3 ms-2 me-2"
                onClick={!slot.selected ? ()=>{
                    handleShow()
                    setSlotId(slot._id)} : ""}
              ></div>
              <div
                style={{
                  borderLeft: "4px solid black",
                  width: "0px",
                  padding: 0,
                  margin: 0,
                }}
              ></div>
            </>
          );
        })}
      </div>

      <Modal className="mt-5" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Select value={selectedCompany} onChange={(e)=>{
            setSelectedCompany(e.target.value)
             setErrMsg('')}} aria-label="Default select example">
        
        { company.map((data)=>{
          return ( !data.selected ? <option value={data._id} >{data.companyname}</option> : '' )
          
        })}
  {/* <option>Open this select menu</option>
  <option ></option>
  <option value="2">Two</option>
  <option value="3">Three</option> */}
</Form.Select>
        </Modal.Body>
        {errMsg ? <p className="text-danger ms-3" >{errMsg}</p> : ""}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
            await  selectSlot()
            
            
              
          }}>
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AdminBookingSlots;
