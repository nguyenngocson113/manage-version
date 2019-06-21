import React, { Component } from 'react';
import List from './List';
import _ from 'lodash';

class Home extends Component {

	state = {
		releases: [],
		isLoading: false,
		error: false,
		evn: 'staging'
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
	 	fetch('/api/getList', {
				method: 'GET'
			}).then(responseJson => responseJson.json()
			).then(result => {
				console.log(result)
				this.setState({releases: result.data});
			})
			.catch(error => {
				console.log('error:', error)
			});
	};

	updateData () {
		fetch('/api/update', {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(this.state.releases)
		})
	}

	setNameVersion(version, name) {
		const {releases = []} = this.state;
		const newRelease = _.cloneDeep(releases);
		_.set(_.find(newRelease, ['version', version]), 'versionName', name);
		console.log(releases)
		this.setState({releases: newRelease})
	}

	render() {
		const { releases = [] } = this.state;

		
		
		return (
			<div>
				<button onClick={() => {this.updateData()}}>SAVE</button>
				{releases.length && <List list={releases} title={['Project', 'Version', 'Date Release', 'Date Create', 'Version Name']} setVersion={this.setNameVersion}/>}
			</div>
		);
	}
}

export default Home;
