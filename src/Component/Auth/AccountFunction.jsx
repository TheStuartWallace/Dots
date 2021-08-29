import React from 'react';
import 'Style/AccountFunction.css';
import FirebaseAction from 'Database/FirebaseAction';
import {AuthContext} from 'Component/Auth/AuthProvider';


export default class AccountFunction extends React.Component{	
	static contextType = AuthContext;

	constructor(props){
		super(props);

		this.state = {
			status : 1,
			email : "",
			password : "",
		};
	}

	componentDidMount(){

	}

	componentDidUpdate(){

	}

	handleChange(e){
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit(e){
		if(this.props.mode === 0){
			FirebaseAction.userLoginAccount(this.state.email,this.state.password).then((data)=>{
				// handle user signin;
			}).catch((error)=>{
				this.setState({error : error,state : -1});
			});
		}else{
			FirebaseAction.userCreateAccount(this.state.email,this.state.password).then((data)=>{
				// handle user account made;
			}).catch((error)=>{
				this.setState({error : error,state : -1});
			});
		}
	}

	render(){
		switch(this.state.status){
			case -1: default: return (<div><h1>{this.state.error.type}</h1><h2>{this.state.error.message}</h2></div>);
			case 0: return (<div>Loading...</div>);

			case 1: return (
				<div id={this.props.mode === 0 ? "dSignIn" : "dSignUp"}>
					<div>
						<h1>{this.props.mode === 0 ? "Sign In to Dots" : "Create a Dots account"}</h1>
						<h2>Email</h2> <input type="text" name="email" value={this.state.email} onChange={(e)=>this.handleChange(e)}/>
						<h2>Password</h2> <input type="password" name="password" value={this.state.password} onChange={(e)=>this.handleChange(e)}/>
						<button onClick={(e)=>this.handleSubmit(e)}>{this.props.mode === 0 ? "Sign In" : "Create Account"}</button>
					</div>
				</div>
			);
		}
	}
}