import React from 'react';
import DeleteButton from './DeleteButton'
import axios from "axios";

class TableBody extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentUserId: '',
            roleId: ''
        }
    }

    deleteButton = (idx, id) => {
        return (
            <DeleteButton model={this.props.model} updateTableBody={this.props.updateTableBody} index={idx} id={id} />
        )
    }

    handleChange = (props) => {
        const userId = props.userId;
        const value = props.e.target.value;
        if(value > 0 &&  userId > 0){
            var apiBaseUrl = "http://localhost:3000/api/users/";
            var self = this;
            const headerConfig = {
                "Content-Type": "application/json",
            }
            axios.patch(apiBaseUrl+ userId, {role_id: value}, headerConfig)
            .then(function (response) {
            if(response.status == 200){
                console.log(response)
                {self.props.updateTableBody(props.index, response.data)}
            }
            })
            .catch(function (error) {
            });
        }
    }

    componentDidMount = () => {
        console.log('componentDidMount')
    }

    roleDropdown = (idx, userId) => {
        return(
            <select className="select-css" onChange={(e) => this.handleChange({userId: userId, index: idx, e: e})}>
                    <option >Select Role</option>
                    {this.props.roleDropdown.map((role) => <option key={role.role_name} value={role.role_id}>{role.role_name}</option>)}
                </select>
        )
    }

    trainerDropdown = (idx, userId) => {
        return(
            <select className="select-css" onChange={(e) => this.handleChange({userId: userId, index: idx, e: e})}>
                <option >Select Trainer</option>
                {this.props.trainerLists.map((trainer, idx) => <option key={idx} value={trainer.trainer_id}>{trainer.trainer_name}</option>)}
            </select>
        )
    }

    createObject = (role_id, user_id) => {
        return { roleId: role_id, userId: user_id }
    }

    render(){
        return(
            <tbody>
                {this.props.rows.map((row, i) => {
                    return (
                        <tr>
                            <td>{ i+1 }</td>
                            {this.props.dataFields.map((keyName, idx) => (
                                <td>
                                    { keyName.dataField != 'action' ? row[keyName.dataField] : this.deleteButton(i, row.id)}
                                    { keyName.dataField == 'assign_role' ? this.roleDropdown(i, row.id) : ''}
                                    { keyName.dataField == 'assign_trainer' ? this.trainerDropdown(i, row.id) : ''}
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
