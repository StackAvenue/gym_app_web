import React from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Bootstrap from "react-bootstrap";
import Signin from './Signin';
import "./sign.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.first_name.length > 0 && this.state.last_name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const axios = require('axios');
    var apiBaseUrl = "http://localhost:3000/api/users";
    var self = this;
    const headerConfig = {
		"Content-Type": "application/json",
	}
	var formData = {
      "first_name": this.state.first_name, "last_name": this.state.last_name,
      "email": this.state.email, "password": this.state.password, "password_confirmation": this.state.password_confirmation
    }
    console.log(formData);
    axios.post(apiBaseUrl+'/sign_up', { user: formData }, headerConfig)
	   .then(function (response) {
	      console.log(response);
	      if(response.status == 200){
	        console.log("registration successfull");
          self.props.history.push("/login");
	      }
	    })
	   .catch(function (error) {
	      console.log(error);
	   });
  }
	render() {
    return (
      <div className="Login">
      	<h1>Registration</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="first_name" bsSize="large">
            <FormLabel>First Name</FormLabel>
            <FormControl autoFocus type="first_name" value={this.state.first_name} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="last_name" bsSize="large">
            <FormLabel>Last Name</FormLabel>
            <FormControl autoFocus type="last_name" value={this.state.last_name} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
          </FormGroup>

          <FormGroup controlId="password_confirmation" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl value={this.state.password_confirmation} onChange={this.handleChange} type="password" />
          </FormGroup>

          <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
            Sign Up 
          </Button>

        </form>
        <p className="text-center">
	    	already have an account! <Link to={`/`}>Sign in</Link>{" "} 
        </p>
      </div>
    );
  }
}

export default withRouter(Signup);
