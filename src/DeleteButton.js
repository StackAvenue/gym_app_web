import React from 'react';
import axios from "axios";

class DeleteTableRow extends React.Component {
    constructor(props) { 
        super(props);
    }

    onClick = () => {
        var apiBaseUrl = "http://localhost:3000/api/" + this.props.model + "/";
        var self = this;
        const headerConfig = {
            "Content-Type": "application/json",
        }
        axios.delete(apiBaseUrl+ this.props.id, {}, headerConfig)
        .then(function (response) {
        if(response.status == 200){
            console.log(response)
            {self.props.updateTableBody(self.props.index)}
        }
        })
        .catch(function (error) {
        });
    }

	render() {
        return (
            <button className="btn btn-sm btn-danger" onClick={() => { this.onClick(this.props.id) }}>Delete</button>
        )
    }
}

export default DeleteTableRow;
