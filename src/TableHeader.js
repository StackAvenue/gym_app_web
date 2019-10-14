import React from 'react';

class TableHeader extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <thead>
                <tr>
                    <th>Sr.No.</th>
                    {this.props.headers.map((header) => {
                        return <th>{header.text}</th>
                    })}
                </tr>
            </thead>
        )
    }

}

export default TableHeader;