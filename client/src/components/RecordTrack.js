import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import api from "../axios";
import { serverURL } from "../serverUrl";
//jQuery libraries

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

function RecordTrack() {
  const navigate = useNavigate()
  const [allApplication, setAllApplication] = useState([]);

  useEffect(()=>{
    const token = localStorage.getItem('admintoken')
    const admin = decodeToken(token)
    if(!admin){
        navigate('/admin')
    }
    },[])

  useEffect(() => {
    try {
      api.get(`${serverURL}/admin/newapplication`).then((response) => {
        console.log(response.data.all);
        setAllApplication(response.data.all);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  return (
    <div>
      <p className="text-center fw-bold text-primary fs-1  mt-5 mb-5">
        RECORD LIST
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
              <th>Registration Approved</th>
              <th>Under process</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {allApplication.map((result, index) => {
              return (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  <td>{result.companyname}</td>
                  <td>
                    {result.address},{result.city},{result.state}
                  </td>
                  {/* <td colSpan={3}><ProgressBar animated now={!result.status ?43 :result.status === 'pending' ? 76 : result.status === 'approved' ? 100 : 0} /></td> */}
                  <td colSpan={3}>
                    <ProgressBar>
                      {!result.status ? (
                        <ProgressBar
                          striped
                          variant="danger"
                          now={43}
                          key={1}
                        />
                      ) : result.status === "pending" ? (
                        <ProgressBar
                          striped
                          variant="warning"
                          now={76}
                          key={2}
                        />
                      ) : result.status === "approved" ? (
                        <ProgressBar
                          striped
                          variant="success"
                          now={100}
                          key={3}
                        />
                      ) : (
                        0
                      )}
                    </ProgressBar>
                  </td>
                  <td style={{ display: "none" }}></td>
                  <td style={{ display: "none" }}></td>
                  {/* <td><Button  className="btn btn-danger">Pending</Button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default RecordTrack;
