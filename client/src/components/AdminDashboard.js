import React, { useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { faGem, faHeart } from "@fortawesome/free-solid-svg-icons";
import { isExpired, decodeToken } from "react-jwt";
import { AdminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../serverUrl";
import { Modal, Button, Form } from "react-bootstrap";

//jQuery libraries

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import api from "../axios";

function AdminDashboard() {
  const { setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [newApplication, setNewApplication] = useState([]);
  
  const [pendingApplication, setPendingApplication] = useState([]);
  const [companyDetails,setCompanyDetails] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCompanyDetails = (formId) =>{
    // const dataid ={
    //   _id:formId
    // }
    api.get(`/admin/getcompanydetails/${formId}`).then((response)=>{
      setCompanyDetails(response.data)
      console.log('hi',companyDetails);
      
    })
  }

  const makePending = async (formId) => {
    const dataid = {
      _id: formId,
    };
    api.post(`/admin/pending`, dataid).then((res) => {
      axios
        .get(`${serverURL}/admin/newapplication`)
        .then((response) => {
          console.log("response", response);
          console.log("pending", response.data.pending);
          setNewApplication(response.data.new);
          setPendingApplication(response.data.pending);
        })
        .catch((err) => {
          console.log(err);
         
        });
    });
  };
  const approve = (formId) => {
    const dataId = {
      _id: formId,
    };
    api.post(`${serverURL}/admin/approve`, dataId).then((res) => {
      axios
        .get(`${serverURL}/admin/newapplication`)
        .then((response) => {
          console.log("response", response);
          console.log("pending", response.data.pending);
          setNewApplication(response.data.new);
          setPendingApplication(response.data.pending);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const decline = (formId) => {
    const dataId = {
      _id: formId,
    };
    api.post(`${serverURL}/admin/decline`, dataId).then(() => {
      axios
        .get(`${serverURL}/admin/newapplication`)
        .then((response) => {
          console.log(response.data.new);
          setNewApplication(response.data.new);
          console.log(response.data.pending);
          setPendingApplication(response.data.pending);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  

  useEffect(() => {
    const token = localStorage.getItem("admintoken");
    if (token) {
      const admin = decodeToken(token);
      if (!admin) {
        localStorage.removeItem("admintoken");
        navigate("/admin");
      } else {
        setAdmin(admin.name);
      }
    } else {
      navigate("/admin");
    }
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
    $(document).ready(function () {
      setTimeout(function () {
        $("#example2").DataTable();
      }, 1000);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`${serverURL}/admin/newapplication`)
      .then((response) => {
        console.log(response.data.new);
        setNewApplication(response.data.new);
        setPendingApplication(response.data.pending);
        console.log(response.data.pending);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <p className="text-center fw-bold text-primary fs-1  mt-5 mb-5">
        NEW APPLICATIONS
      </p>
      <div style={{ overflowX: "auto" }} className="mt-5 card card shadow p-3">
        <table
          id="example"
          className="table table-responsive table-hover table-bordered col-12"
        >
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Company Name</th>
              <th>Company Details</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newApplication.map((result, index) => {
              return (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.companyname}</td>
                  <td>
                    {result.address},{result.city},{result.state}
                  </td>
                  <td>
                    <Button onClick={async() => {
                        await getCompanyDetails(result._id)
                        await handleShow();
                      }} className="btn btn-success">Open</Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        makePending(result._id);
                      }}
                      className="btn btn-danger"
                    >
                      Pending
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-center fw-bold text-primary fs-1  mt-5 mb-5">
        PENDING APPLICATIONS
      </p>
      <div style={{ overflowX: "auto"}} className="mt-5 card card shadow p-3">
        <table
          id="example2"
          className="table table-responsive table-hover table-bordered col-12"
        >
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Company name</th>
              <th>Company Details</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pendingApplication.map((result, index) => {
              return (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.companyname}</td>
                  <td>
                    {result.address},{result.city},{result.state}
                  </td>
                  <td>
                    <Button
                      onClick={async() => {
                        await getCompanyDetails(result._id)
                        await handleShow();
                      }}
                      className="btn btn-primary"
                    >
                      Open
                    </Button>
                  </td>
                  <td>
                    {result.status === "approved" ? (
                      <p className="text-info fw-bolder">Approved</p>
                    ) : result.status === "declined" ? "" :  (
                      <Button
                        onClick={() => {
                          approve(result._id);
                        }}
                        className="btn btn-success"
                      >
                        Approve
                      </Button>
                    )}
                  </td>
                  <td>
                    {result.status === "declined" ? (
                      <p className="text-danger fw-bolder">Declined</p>
                    ) : result.status === "approved" ? "" : (
                      <Button
                        onClick={() => {
                          decline(result._id);
                        }}
                        className="btn btn-danger"
                      >
                        Decline
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><p className="text-primary fw-bold p-0 m-0 fs-2">COMPANY DETAILS</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={companyDetails.name}
                autoFocus
                readOnly
              
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder={companyDetails.address}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={companyDetails.city}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder={companyDetails.state}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={companyDetails.email}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder={companyDetails.phoneno}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="tetx"
                placeholder={companyDetails.companyname}
                autoFocus
                readOnly
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.teamandbackground}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Company and Products</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.companyandproduct}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Problem trying to solve</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.problem}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Unique about solution</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.solution}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.valueproposition}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.competitors}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.revenue}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.potentialmarketsize}
               rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.plan}
               rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type</Form.Label>
             
              <Form.Control
                type=""
                placeholder={companyDetails.type}
                autoFocus
                readOnly
              
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              
            >
              <Form.Label>Team and Background</Form.Label>
              <Form.Control readOnly
               as="textarea" 
               placeholder={companyDetails.businessproposal}
               rows={3} />
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AdminDashboard;
