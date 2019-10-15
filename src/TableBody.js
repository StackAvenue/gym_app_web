import React from 'react';
import DeleteButton from './DeleteButton'
import { Button } from 'react-bootstrap'
import PopUpModal from './PopUpModal';
import axios from "axios";

class TableBody extends React.Component {
    constructor(props){
        super(props)
    }

    actionButton = (idx, id) => {
        if(this.props.pannel != 'trainer'){
            return (
                <DeleteButton model={this.props.model} updateTableBody={this.props.updateTableBody} index={idx} id={id} />
            )
        }else{
            return (
                <div className="btn-fix-width">
                    <Button className="btn btn-sm btn-primary" onClick={this.addUserDetail}>Add User Details</Button>
                    <Button className="btn btn-sm btn-primary" onClick={this.viewUserDetail}>View Details</Button>
                </div>
            )
        }
    }

    addUserDetail = () => {
        return <PopUpModal />
    }

    viewUserDetail = () => {
    }

    apiCall = (props) => {
        console.log("at api call", props)
        console.log(props.userData, props.userId)
        console.log((props.lenght > 0 &&  props.userId > 0))
        var apiBaseUrl = "http://localhost:3000/api/users/";
        var self = this;
        const headerConfig = {
            "Content-Type": "application/json",
        }
        axios.patch(apiBaseUrl+ props.userId, props.userData, headerConfig)
        .then(function (response) {
        if(response.status == 200){
            console.log(response)
            {self.props.updateTableBody(props.index, response.data)}
        }
        })
        .catch(function (error) {
        });
    }
    handleTrainerChange = (props) => {
        const userId = props.userId;
        const value = props.e.target.value;
        if(value > 0 &&  userId > 0){
            const data = {
                index: props.index,
                userId: userId,
                userData: {
                    trainer_id: value
                }
            }
            this.apiCall(data)
        }
    }

    handleRoleChange = (props) => {
        const userId = props.userId;
        const value = props.e.target.value;
        if(value > 0 &&  userId > 0){
            const data = {
                index: props.index,
                userId: userId,
                userData: {
                    role_id: value
                }
            }
            this.apiCall(data)
        }
    }

    componentDidMount = () => {
        console.log('componentDidMount')
    }

    roleDropdown = (idx, userId, roleId) => {
        return(
            <select className="select-css" value={roleId > 0 ? roleId : ""} onChange={(e) => this.handleRoleChange({userId: userId, index: idx, e: e})}>
                <option >Select Role</option>
                {this.props.roleDropdown.map((role) => <option key={role.role_name} value={role.role_id}>{role.role_name}</option>)}
            </select>
        )
    }

    trainerDropdown = (idx, userId, trainerId) => {
        return(
            <select className="select-css" value={trainerId > 0 ? trainerId : "" } onChange={(e) => this.handleTrainerChange({userId: userId, index: idx, e: e})}>
                <option  >Select Trainer</option>
                {this.props.trainerLists.map((trainer, idx) => <option key={idx} value={trainer.trainer_id}>{trainer.trainer_name}</option>)}
            </select>
        )
    }

    render(){
        return(
            <tbody>
                {this.props.rows.map((row, i) => {
                    return (
                        <tr key={i}>
                            <td>{ i+1 }</td>
                            {this.props.dataFields.map((keyName, idx) => (
                                <td key={idx}>
                                    { keyName.dataField != 'action' ? row[keyName.dataField] : this.actionButton(i, row.id)}
                                    { keyName.dataField == 'assign_role' ? this.roleDropdown(i, row.id, row.role_id) : ''}
                                    { keyName.dataField == 'assign_trainer' ? this.trainerDropdown(i, row.id, row.trainer_id) : ''}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        )
    }

}

export default TableBody;
