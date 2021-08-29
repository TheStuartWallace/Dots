import React from 'react';
import "Style/DotsApp.css"

import AuthProvider from 'Component/Auth/AuthProvider';
import AccountFunction from 'Component/Auth/AccountFunction';
import MainPage from 'Component/MainPage/MainPage';
import DotBoard from 'Component/Board/DotBoard';
import Profile from 'Component/Profile/Profile';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

export default class DotsApp extends React.Component{
	render(){
		return (
			<AuthProvider>
				<Router basename={`/${process.env.PUBLIC_URL}`}>
					<Switch>
						<Route path="/" exact component={MainPage} />
						<Route path="/signin/" exact render={(props) =><AccountFunction mode={0} />} />
						<Route path="/signup/" exact render={(props) =><AccountFunction mode={1} />} />
						<Route path="/u/:id" exact component={Profile} />
						<Route path="/u/:id/:bid" exact component={DotBoard} />
					</Switch>
				</Router>
			</AuthProvider>
		);
	}
} 