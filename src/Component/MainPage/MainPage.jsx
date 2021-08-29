import React from 'react';
import {AuthContext} from 'Component/Auth/AuthProvider';

export default class MainPage extends React.Component{	
	static contextType = AuthContext;
	render(){
		return (
			<div id="dotsMainPage">
				<header>Welcome, {this.context?.currentUser ? this.context.currentUser.email : "Stranger"}</header>
				<main>
					<div>
						<h1>Welcome to Dots</h1>
						<h2>Your daily checklist</h2>
					</div>

					<div>
						Check out your dots here, or make a new one
					</div>
				</main>
			</div>
		);
	}
}