import React from 'react';
import Modal from 'react-bootstrap/Modal'
import UserDetails from './UserDetails';
import { Button, FormControl, Form } from 'react-bootstrap'
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from "mdbreact";

class PopUpModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            show: true,
        }
      }
      handleClose = () => {
        this.setState({show: false})
      }

      handleShow = () => {
        this.setState({show: true})
      }
      
      render(){
  
        return (
          <div>    
            <Modal show={this.state.show} onHide={this.props.removeUserDetail} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>User Detail</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UserDetails handleClose={this.props.removeUserDetail} updateUserState={this.props.updateUserState}/>
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </div>
        )
    }
}

export default PopUpModal;
