import React, { Component } from 'react'
import routes from './config/routes'
import {Route,Switch} from 'react-router-dom'
import './utils/rem'

export default class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					{routes.map( routeObj => <Route key={routeObj.path} {...routeObj}/> )}
				</Switch>
			</div>
		)
	}
}
