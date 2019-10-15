import React, { Component } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Table from 'react-bootstrap/Table'

class CustomTable extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Table className="App" striped bordered hover responsive="lg" size="sm">
                <TableHeader headers={this.props.header} />
                <TableBody pannel={this.props.pannel} model={this.props.model} updateTableBody={this.props.updateTableBody} rows={this.props.tBodyData} dataFields={this.props.header} roleDropdown={this.props.roleLists} trainerLists={this.props.trainerLists} />
            </Table>
        )
    }
}

export default CustomTable