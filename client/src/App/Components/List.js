import React, { Component } from 'react';
import './List.scss';
import Table from './Table';
import _ from 'lodash';

const title = ['Project', 'Version', 'Date Release', 'Date Create', 'Version Name'];
class List extends Component {
    constructor(props) {
        super(props);
        this.setNameVersion.bind(this)
    }

    state = {
        releases: [],
        type: 'product',
        isOpen: false,
        project: 'maua-adminportal'
    };

    componentDidMount() {
		this.fetchData();
	}

	fetchData() {
	 	fetch('/api/getList', {
				method: 'GET'
			}).then(responseJson => responseJson.json()
			).then(result => {
				this.setState({releases: result});
			})
			.catch(error => {
				console.log('error:', error)
			});
	};

	updateData() {
		fetch('/api/update', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(this.state.releases)
		})
    }

	setNameVersion(name, version) {
        const {releases = []} = this.state;
		const newRelease = _.cloneDeep(releases);
		_.set(_.find(newRelease, ['version', version]), 'versionName', name);
        this.setState({releases: newRelease})
    }


    chooseEnviroment(e) {
        this.setState({ type: e.target.value })
    }

    chooseProject(e) {
        this.setState({ project: e.target.value })
    }

    render() {
        const { type = 'product', releases: list = [], project = 'maua-adminportal' } = this.state;
        return (
            <>
                <select value={project} onChange={(e) => this.chooseProject(e)} >
                    <option value="maua-adminportal">Adminportal</option>
                    <option value="maua-backend">Backend</option>
                    <option value="maua-buyer">Buyer</option>
                    <option value="maua-frontend">Frontend</option>
                    <option value="maua-vendor">Vendor</option>
                </select>
                <select value={type} onChange={(e) => this.chooseEnviroment(e)} >
                    <option value="product">Product</option>
                    <option value="staging">Staging</option>
                </select>
                <button onClick={() => this.updateData()}>Save</button>
                <div className="List">
                    <ul className="title">
                        {
                            title.map((item, index) => {
                                const { header = '', name = '' } = item;
                                return (
                                    <li className={header} key={index}>{item}</li>
                                )
                            })
                        }
                    </ul>
                    <table className="table">
                        <tbody>
                            {
                                list.map((item, index) => {
                                    const isEven = (index % 2) === 0 ? true : false;
                                    const {
                                        projects = []
                                    } = item;
                                    const { slug: projectName = '' } = projects[0];
                                    return (<Table
                                        name={projectName}
                                        item={item}
                                        type={type}
                                        setVersion={(name, version) => this.setNameVersion(name, version)}
                                        key={index}
                                        project={project}
                                    />);
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default List;
