import React from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel, HelpBlock } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Dashboard from './Dashboard';
import FormErrors from './FormErrors';
import "./sign.css";

class Signin extends React.Component { 
  constructor(props) { 
    super(props);
    this.state = {
      email: "",
      password: "", 
      formErrors: { email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'please enter valid email';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        fieldValidationErrors.password = passwordValid ? '' : 'password is too short';
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  handleChange = event => {
    const name = event.target.id
    const value = event.target.value
    this.setState(
      { [name]: value }, 
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
    var formData = { "email": this.state.email, "password": this.state.password }
    console.log(formData);

    axios.post(apiBaseUrl+'/sign_in', { user: formData }, headerConfig)
     .then(function (response) {
       console.log(response);
       if(response.status == 200){
         localStorage.setItem("userData", JSON.stringify(response.data));
         // self.props.history.push("/");
         window.location.reload();
       }
     })
     .catch(function (error) {
      if (error.response.status == 422) {
        console.log(error.response.data);
        self.setState({ formErrors: error.response.data })
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
     });
  }

	render() {
    return (
      <div className="Login">
      	<h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
          </FormGroup>
          <div className="ErrorMessage">
            <FormErrors formErrors={this.state.formErrors} />
          </div>

          <Button block bsSize="large" disabled={!this.state.formValid} type="submit">
            Login
          </Button>
        </form>
        <p className="text-center">
	    	Don't have an account? <Link to={`/signup`}>Sign up</Link>{" "}
        </p>
      </div>
    );
  }
}

export default withRouter(Signin);
