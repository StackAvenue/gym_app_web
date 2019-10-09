import React, { Component } from 'react';
import { Link,  withRouter, BrowserRouter as Router } from "react-router-dom";
import { Button, FormControl, Form } from 'react-bootstrap'
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from "mdbreact";
import UserDetails from './UserDetails';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  state = {
    isOpen: false,
    showAddBtn: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout = async () => {
    console.log('at dashboard')
    localStorage.removeItem("userData");
    // this.props.history.push("/login");
    window.location.reload();
  };

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onButtonClick = () => {
    this.setState({
      showAddBtn: true,
    });
  }

  removeUserDetailForm = () => {
    console.log('removeUserDetailForm')
    if(this.state.showAddBtn){
      this.setState({ showAddBtn: false });
    }
  }

  render() {
    return (
      <Router>
        <div>
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
          <Button className="btn btn-md btn-primary" onClick={this.onButtonClick}>Add User Details</Button>
          {this.state.showAddBtn ? <UserDetails removeUserDetail={this.removeUserDetailForm} /> : null}
        </div>
      </Router>
    );
  }
}

export default withRouter(Dashboard);