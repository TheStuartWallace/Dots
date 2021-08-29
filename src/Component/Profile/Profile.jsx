import React from 'react';
import FirebaseAction from 'Database/FirebaseAction';
import {AuthContext} from 'Component/Auth/AuthProvider';

export default class Profile extends React.Component{
	static contextType = AuthContext;

	constructor(props){
		super(props);
		
		this.state = {
			status : 0,
		};
	}

	componentDidUpdate(){
		if(this.state.status === 0 && this.state.profile === undefined && this.context.currentUser){
			FirebaseAction.getProfile(this.props.match.params.id)
			.then(data=>{
				this.setState({profile : data, status : 1});
			})
			.catch(error=>{
				this.setState({error : error, status : -1});
			});
		}
	}

	componentDidMount(){
		if(this.state.status === 0 && this.state.profile === undefined && this.context.currentUser){
			FirebaseAction.getProfile(this.props.match.params.id)
			.then(data=>{
				this.setState({profile : data, status : 1});
			})
			.catch(error=>{
				this.setState({error : error, status : -1});
			});
		}
	}

	render(){
		switch(this.state.status){
			case -1: return <div id="dotError"><b>Error</b> {this.state.error.message}</div>
			case 0: return <div id="dotLoading">Loading</div>

			case 1: return (
				<div id="dotProfile">
					<header>
						<div>Profile for {this.state.profile.email}</div>
					</header>

					<main>
						{
							this.state.profile.boards.map((data,index)=>{
								return (<div>[{index+1}] : {data.title}</div>)
							})
						}
					</main>
				</div>
			);
		}
	}
}