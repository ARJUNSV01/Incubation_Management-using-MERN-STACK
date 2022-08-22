import React, { useContext, useEffect, useState } from "react";
import { MDBRadio } from "mdb-react-ui-kit";
import { UserContext } from "../contexts/UserContext";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { serverURL } from "../serverUrl";
var FormData = require("form-data");

function UserHome() {
  const { setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phoneno: "",
    companyname: "",
    teamandbackground: "",
    companyandproduct: "",
    problem: "",
    solution: "",
    valueproposition: ",",
    competitors: "",
    revenue: "",
    potentialmarketsize: "",
    plan: "",
    type: "",
    businessproposal: "",
  };
  console.log(initialValues.type);
  const [formValues, setFormValues] = useState(initialValues);
  const [errMsg, setErrMsg] = useState("");
  const [logo, setLogo] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = () => {
    if (
      !logo ||
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.address === "" ||
      formValues.city === "" ||
      formValues.state === "" ||
      formValues.phoneno === "" ||
      formValues.companyname === "" ||
      formValues.teamandbackground === "" ||
      formValues.companyandproduct === "" ||
      formValues.problem === "" ||
      formValues.solution === "" ||
      formValues.valueproposition === "" ||
      formValues.competitors === "" ||
      formValues.revenue === "" ||
      formValues.potentialmarketsize === "" ||
      formValues.plan === "" ||
      formValues.businessproposal === ""
    ) {
      setErrMsg("Enter all the required fields !!!");
    } else {
      const data = new FormData();

      data.append("logo", logo);
      data.append("data", JSON.stringify(formValues));

      //   for (var key of data.entries()) {
      // 	console.log(key[0] + ', ' + key[1])
      // }
      
      const user = JSON.parse(localStorage.getItem('userData'))
      console.log(user.id);
      const userId=user.id
     
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "userId":userId
        },
      };
      axios
        .post(`${serverURL}/submitform`, data, config)
        .then((response) => {
          console.log(response);
          
         
        //   console.log(formSubmitted);
        // //   const user = decodeToken(localStorage.getItem('usertoken'));
        // //   setUser({user:user.name,formSubmitted:true})
        
          navigate("/processing");
         
        })
        .catch((err) => {
          setErrMsg(`Form wasn't submitted`);
        });
    }
  };

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
  useEffect(()=>{
      
    const user = JSON.parse(localStorage.getItem('userData'))
    console.log(user.id);
    const userId=user.id
    
    const config = {
      headers: {
        "userId":userId
      },
    };
    axios.get(`${serverURL}/checkApplicationStatus`,config).then((response)=>{
      console.log(response);
      navigate('/processing')
    }).catch((err)=>{
      navigate('/home')
    })
  },[])
  return (
    <div>
      <p className="text-success mt-5 fw-bold fs-1">
        APPLICATION FOR INCUBATION
      </p>
      <div className="container mt-3 card col-6 p-5 bg-warning">
        <div className="row mb-3">
          <div className="form-grou col-md-6 col-12 ">
            <label className="float-start">Name</label>
            <input
              type="text"
              value={formValues.name}
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter name"
            />
          </div>

          <div className="form-group col-md-6 col-12">
            <label className="float-start">Address</label>
            <input
              type="text"
              value={formValues.address}
              name="address"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Address"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-grou col-md-6 col-12">
            <label className="float-start">City</label>
            <input
              type="text"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter City"
            />
          </div>

          <div className="form-group col-md-6 col-12">
            <label className="float-start">State</label>
            <input
              type="text"
              value={formValues.state}
              name="state"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter State"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-grou col-md-6 col-12">
            <label className="float-start">Email</label>
            <input
              type="email"
              value={formValues.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group col-md-6 col-12">
            <label className="float-start">Phone no</label>
            <input
              type="number"
              value={formValues.phoneno}
              name="phoneno"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Phone no"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-6 col-12">
            <label className="float-start">Company Name</label>
            <input
              type="text"
              value={formValues.companyname}
              name="companyname"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter Company Name"
            />
          </div>

          <div className="form-group col-md-6 col-12">
            <label className="float-start ">Company Logo</label>
            <div>
              <img
                alt="Posts"
                width="200px"
                height="200px"
                src={logo ? URL.createObjectURL(logo) : ""}
              ></img>
            </div>
            <input
              type="file"
              onChange={(e) => {
                setLogo(e.target.files[0]);
              }}
              name="logo"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            Describe your team and background
          </label>
          <textarea
            type="companyname"
            value={formValues.teamandbackground}
            onChange={handleChange}
            name="teamandbackground"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            Describe your company and products
          </label>
          <textarea
            type="companyname"
            value={formValues.companyandproduct}
            onChange={handleChange}
            name="companyandproduct"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            Describe the problem you are trying to solve
          </label>
          <textarea
            type="companyname"
            value={formValues.problem}
            onChange={handleChange}
            name="problem"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            What is unique about your solution?
          </label>
          <textarea
            type="companyname"
            value={formValues.solution}
            onChange={handleChange}
            name="solution"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            What is your value proposition for the customer?
          </label>
          <textarea
            type="companyname"
            value={formValues.valueproposition}
            onChange={handleChange}
            name="valueproposition"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            Who are your competitors and what is your competative advantage?
          </label>
          <textarea
            type="companyname"
            value={formValues.competitors}
            onChange={handleChange}
            name="competitors"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">Explain your revenue model</label>
          <textarea
            type="companyname"
            value={formValues.revenue}
            onChange={handleChange}
            name="revenue"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            What is the potential market size of the product?
          </label>
          <textarea
            type="companyname"
            value={formValues.potentialmarketsize}
            onChange={handleChange}
            name="potentialmarketsize"
            className="form-control"
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            How do you market or plan to market your products and services?
          </label>
          <textarea
            type="companyname"
            value={formValues.plan}
            onChange={handleChange}
            name="plan"
            className="form-control"
          />
        </div>

        <div>
          <label className="float-start mb-3">Type of Incubation needed</label>
        </div>
        <div className="col-3 mb-4">
          <MDBRadio
            name="type"
            id="flexRadioDefault1"
            label="Physical Incubation"
            onClick={handleChange}
            value="Physical Incubation"
            
          />
          <MDBRadio
            name="type"
            id="flexRadioDefault2"
            label="Virtual Incubation"
            onClick={handleChange}
            value="Virtual Incubation"
           
          />
        </div>
        <div className="form-group col-md-12 col-12 mb-4">
          <label className="float-start">
            Upload a detailed business proposal
          </label>
          <textarea
            type="companyname"
            value={formValues.businessproposal}
            onChange={handleChange}
            name="businessproposal"
            className="form-control"
          />
        </div>
      </div>

      <div>
        <div className="text-danger fw-bold mb-4">{errMsg}</div>
        <Button
          className="btn btn-primary"
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
export default UserHome;
