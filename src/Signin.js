import React from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Bootstrap from "react-bootstrap";
import Dashboard from './Dashboard';
import "./sign.css";

class Signin extends React.Component { constructor(props) { 
  super(props);
  this.state = { email: "", password: "" }; }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
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
    var formData = { "email": this.state.email, "password": this.state.password }

    axios.post(apiBaseUrl+'/sign_in', { user: formData }, headerConfig)
     .then(function (response) {
       console.log(response);
       console.log(response.status);
       if(response.status == 200){
         console.log("Login successfull");
         localStorage.setItem("userData", JSON.stringify(response.data));
         self.props.history.push("/");
       }
       else if(response.status == 204){
         console.log("Username password do not match");
         alert("username password do not match")
       }
       else{
         console.log("Username does not exists");
         alert("Username does not exist");
       }
     })
     .catch(function (error) {
      console.log(error);
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
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
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
