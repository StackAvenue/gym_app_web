import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import FormErrors from './FormErrors';
import "./sign.css";

class UserDetails extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            height: "",
            weight: "", 
            age: "",
            formErrors: { age: "", height: "", weight: ""},
            formValid: false
        };
        this.userData = JSON.parse(localStorage.getItem("userData"));
    }

    validateForm() {
        this.setState({ formValid: this.state.ageValid && this.state.heightValid && this.state.weightValid });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let ageValid = this.state.ageValid;
        let heightValid = this.state.heightValid;
        let weightValid = this.state.weightValid;
    
        switch(fieldName) {
            case 'age':
                ageValid = value.length <= 2 && value > 1
                fieldValidationErrors.age = ageValid ? '' : 'please enter valid age';
                break;
            case 'height':
                heightValid = value.length <= 6 && value > 1;
                fieldValidationErrors.height = heightValid ? '' : 'please enter valid height';
                break;
            case 'weight':
                weightValid = value.length <= 6 && value > 1;
                fieldValidationErrors.weight = weightValid ? '' : 'please enter valid weight';
                break;
            default:
                break;
        }
        this.setState({ 
            formErrors: fieldValidationErrors,
            ageValid: ageValid,
            weightValid: weightValid,
            heightValid: heightValid
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
        var apiBaseUrl = "http://localhost:3000/api/users/";
        var self = this;
        const headerConfig = {
            "Content-Type": "application/json",
        }
        var userDetails = { "age": this.state.age, "height": this.state.height, "weight": this.state.weight }
        axios.post(apiBaseUrl+ self.userData.id +'/user_details', { user_details: userDetails }, headerConfig)
        .then(function (response) {
        if(response.status == 200){
            {self.props.removeUserDetail()}
        }
        })
        .catch(function (error) {
        if (error.response.status == 422) {
            self.setState({ formErrors: error.response.data })
        }
        });
    }

	render() {
        return (
        <div className="Login">
            <h1>User Detail</h1>
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="height" bsSize="large">
                    <FormLabel>Height (in cm.)</FormLabel>
                    <FormControl autoFocus type="number" value={this.state.height} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="weight" bsSize="large">
                    <FormLabel>Weight (in kg.)</FormLabel>
                    <FormControl value={this.state.weight} onChange={this.handleChange} type="number" />
                </FormGroup>
                <FormGroup controlId="age" bsSize="large">
                    <FormLabel>Age (in year)</FormLabel>
                    <FormControl value={this.state.age} onChange={this.handleChange} type="number" />
                </FormGroup>
                <div className="ErrorMessage">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className="">
                    <Button className="btn btn-md btn-success"  bsSize="large" disabled={!this.state.formValid} type="submit">
                        Save
                    </Button>
                    <Button className="btn btn-md btn-danger" bsSize="large" onClick={this.props.removeUserDetail} type="button">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
        );
    }
}

export default withRouter(UserDetails);
