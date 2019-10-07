import React, { Component } from 'react';
import { Link,  withRouter, BrowserRouter as Router } from "react-router-dom";
import { Button, Navbar, NavItem, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap'
import { MDBNavbar, MDBNavbarNav, MDBNavbarBrand, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import Signin from './Signin';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // console.log('at dashboard')
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout = async () => {
    console.log('at dashboard')
    localStorage.removeItem("userData");
    this.props.history.push("/login");
  };

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (
      <Router>
        <div className="container">  
          <MDBNavbar color="default-color" dark expand="md">
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="">Search</Button>
                </Form>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      {'Welcome, '}{this.capitalize(this.userData.first_name)}{' '}
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <Link onClick={this.logout}  color="success">Logout</Link>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </div>
      </Router>
    );
  }
}

export default withRouter(Dashboard);
