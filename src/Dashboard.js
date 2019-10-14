import React, { Component } from 'react';
import { Link,  withRouter, BrowserRouter as Router } from "react-router-dom";
import { Button, FormControl, Form } from 'react-bootstrap'
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from "mdbreact";
import CustomTable from './Table';
import PopUpModal from './PopUpModal';
import axios from "axios";


class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.userData = JSON.parse(localStorage.getItem("userData"));
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    state = {
        isOpen: false,
        showAddBtn: false,
        userDetails: [],
        allUsers: [],
        roleLists: [],
        trainerLists: [],
        role: '',
        userDetailsOpen: true,
        userOpen: false,
        isModalOpen: false,
        isModalClose: true,
        adminColumns: [{
            dataField: 'first_name',
            text: 'User Name'
          }, {
            dataField: 'email',
            text: 'Email'
          }, {
            dataField: 'created_at',
            text: 'Created Date'
          }, {
            dataField: 'role',
            text: 'User Role'
          }, {
            dataField: 'action',
            text: 'Action'
          }, {
            dataField: 'assign_role',
            text: 'Assign Role'
          }, {
            dataField: 'assign_trainer',
            text: 'Assign Trainer'
        }],

        clientColumns: [{
            dataField: 'age',
            text: 'Age'
          }, {
            dataField: 'height',
            text: 'Height'
          }, {
            dataField: 'weight',
            text: 'Weight'
          }, {
            dataField: 'created_at',
            text: 'Created Date'
          }, {
            dataField: 'action',
            text: 'Action'
        }]
    };

    toggleCollapse = () => {
        this.setState({
            userOpen: this.state.userOpen ? false : true ,
            userDetailsOpen: this.state.userDetailsOpen ? false : true
         });
    }

    adminPanelBtn = () => {
        return <Button className="btn btn-md btn-primary" onClick={this.toggleCollapse}>Admin Panel</Button>
    }
    
    trainerPanelBtn = () => {
        return <Button className="btn btn-md btn-primary" onClick={this.toggleCollapse}>Trainer Panel</Button>
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        var self = this;
        var apiBaseUrl = "http://localhost:3000/api/users/";
        const headerConfig = { "Content-Type": "application/json" }
        axios.get(apiBaseUrl + userData.id, headerConfig)
        .then(function (response) {
            if(response.status == 200){
                self.setState({ 
                    userDetails: response.data.details,
                    allUsers: response.data.all_users,
                    role: response.data.role,
                    roleLists: response.data.role_lists,
                    trainerLists: response.data.trainer_lists
                })
            }
        })
        .catch(function (error) {
            console.log(error.config);
        });
    }

    logout = () => {
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
            userOpen : false,
            userDetailsOpen: true
        });
    }

    removeUserDetailForm = () => {
        if(this.state.showAddBtn){
        this.setState({ showAddBtn: false });
        }
    }

    updateUserState = (user_data) => {
        this.setState({
            userDetails: this.state.userDetails.concat(user_data)
        })
    }


    userDetailsTable = () => {
        return <CustomTable updateTableBody={this.updateTableBody} header={this.state.clientColumns} tBodyData={this.state.userDetails} model={'user_details'}/>
    }
    
    allUserTable = () => {
        return <CustomTable updateTableBody={this.updateTableBody} header={this.state.adminColumns} tBodyData={this.state.allUsers} roleLists={this.state.roleLists} model={'users'} trainerLists={this.state.trainerLists} />
    }

    updateTableBody = (idx, data) => {
        console.log('updateTableBody', idx, data)
        console.log('updateTableBody', data == undefined)
        if(this.state.userOpen){
            if(data != undefined){
                const users = this.state.allUsers
                users[idx] = data
                this.setState({ allUsers: users})
            }else{
                this.setState({ allUsers: this.state.allUsers.splice(idx, 1)})
            }
        }else if (this.state.userDetailsOpen){
            this.setState({ UserDetails: this.state.userDetails.splice(idx, 1)})            
        }
    }

    render() {
        const { isModalOpen } = this.state;
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
            {this.state.role == 'admin' ? this.adminPanelBtn() : null}
            {this.state.role == 'trainer' ? this.trainerPanelBtn() : null}
            {/* {this.state.showAddBtn ? <UserDetails removeUserDetail={this.removeUserDetailForm} updateUserState={this.updateUserState} /> : null} */}
            {this.state.showAddBtn ? <PopUpModal removeUserDetail={this.removeUserDetailForm} updateUserState={this.updateUserState} /> : null}
            
            { this.state.userDetailsOpen && this.state.userDetails.length > 0 ? this.userDetailsTable() : null }
            { this.state.userOpen && this.state.allUsers.length > 0 ? this.allUserTable() : null }
            </div>
        </Router>
        );
    }
}

export default withRouter(Dashboard);