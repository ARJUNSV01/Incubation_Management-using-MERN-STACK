import React from 'react'
import { Navbar,Container,Button,NavDropdown,Nav,Form,FormControl } from 'react-bootstrap';

function AdminHeader(){
    return(
        <div className='mb-5'>
            <Navbar className='navbar fixed-top' style={{backgroundColor:'black'}} collapseOnSelect expand="lg"  variant="dark">
  <Container>
  <Navbar.Brand href="#home"></Navbar.Brand>
  {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
    </Nav>
    <Nav>
      {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
      {/* { admin ? <Button onClick={()=>{
            localStorage.removeItem('admintoken')
           setAdmin('')
            navigate("/admin");
        }
            } variant="outline-success">Logout</Button>:<Button variant="outline-success" onClick={()=>{navigate('/admin')}}>Login</Button>} */}
            <Navbar.Brand href="#home"><p className='text-dark'>ty</p></Navbar.Brand>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar> 
        </div>
    )
}
export default AdminHeader;