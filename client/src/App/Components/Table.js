import React, { Component } from 'react';
import './Table.scss';

class Table extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isUpdate: false
    };

    updateVersion() {
        this.setState({ isUpdate: true });
    }

    render() {
        const {
            name = '',
            item: {
                index = '',
                version = '',
                dateReleased = '',
                dateCreated = '',
                versionName = ''
            } = {},
            type = ''
        } = this.props;

        const { isUpdate = false } = this.state;
        const isVersionProduct = version.includes(type);
        return (
            (isVersionProduct &&
                <tr key={index}>
                    <td tabIndex={index}><span>{name}</span></td>
                    <td tabIndex={index}><span>{version}</span></td>
                    <td tabIndex={index}><span>{dateReleased}</span></td>
                    <td tabIndex={index}><span>{dateCreated}</span></td>
                    <td tabIndex={index} onClick={() => { this.updateVersion() }}> {isUpdate ? <input onChange={(e) => { this.props.setVersion(e.target.value, version) }}></input> : <span>{versionName}</span>}</td>
                </tr>)
        );
    }
}



export default Table;
