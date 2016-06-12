import React from 'react'
import { Route, IndexRedirect} from 'react-router'
import LoginContainer from '../containers/LoginContainer'
import LoginComponent from '../components/LoginComponent'
import ProfileContainer from '../containers/ProfileContainer'
import SignupComponent from '../components/SignupComponent'
import Dashboard from '../components/dashboard/Dashboard'
import App from '../containers/App'



export default () => [(
  <Route path='/user' component={LoginContainer} key='user-admin'>
    <Route path='/login' component={LoginComponent} />
    <Route path='/signup' component={SignupComponent} />
  </Route>),
  (<Route path='/' component={App} key='app'>
  	<Route path='/dashboard' component={Dashboard}/>
  	<IndexRedirect to='/dashboard'/>
  	<Route path='/me' component={ProfileContainer} />
  </Route>)]