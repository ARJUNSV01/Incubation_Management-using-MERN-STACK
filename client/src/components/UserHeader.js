import React,{useContext} from "react";
import { Navbar,Container,Button,NavDropdown,Nav,Form,FormControl } from 'react-bootstrap';

import {useNavigate} from 'react-router-dom'
import { UserContext } from "../contexts/UserContext";
function UserHeader(){
    const{user,setUser}=useContext(UserContext)
    
    
    let navigate = useNavigate();
return(
    <div>
        <Navbar bg="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand className="text-white" href="#">Dashboard</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        {/* <Nav.Link href="#action1">Home</Nav.Link>
        <Nav.Link href="#action2">Link</Nav.Link> */}
        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown> */}
        {/* <Nav.Link href="#" disabled>
          Link
        </Nav.Link> */}
      </Nav>
      {/* <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        /> */}
         <Nav.Link >{user}</Nav.Link>
         { user ? <Button onClick={()=>{
            localStorage.removeItem('usertoken')
           setUser('')
            navigate("/");
        }
            } variant="outline-success">Logout</Button>:<Button variant="outline-success" onClick={()=>{navigate('/')}}>Login</Button>}
       
      
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
)
}
export default UserHeader;