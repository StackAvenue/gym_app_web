import React from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Bootstrap from "react-bootstrap";
import Signin from './Signin';
import FormErrors from './FormErrors';
import "./sign.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confPasswordValid: "",
      formErrors: { email: '', password: '', password_confirmation: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.confPasswordValid && this.state.first_name.length > 0 && this.state.last_name.length > 0
     });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confPasswordValid = this.state.confPasswordValid;
    
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'please enter valid email';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '' : 'password is too short';
        break;
      case 'password_confirmation':
        confPasswordValid = this.state.password === value
        fieldValidationErrors.password_confirmation = confPasswordValid ? '' : 'password and confirmation password not match';
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confPasswordValid: confPasswordValid
                  }, this.validateForm);
  }

  handleChange = event => {
    const name = event.target.id
    const value = event.target.value
    this.setState(
      {[name]: value },
      () => { this.validateField(name, value) }
    );
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
            <FormControl type="last_name" value={this.state.last_name} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl type="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
          </FormGroup>

          <FormGroup controlId="password_confirmation" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl value={this.state.password_confirmation} onChange={this.handleChange} type="password" />
          </FormGroup>
          <div className="ErrorMessage">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Button block bsSize="large" disabled={!this.state.formValid} type="submit">
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
