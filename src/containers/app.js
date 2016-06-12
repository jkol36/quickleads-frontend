import {firebaseRef} from 'config'
import {userUpdated} from 'actions/auth'
import {apiKeysRecieved} from 'actions/apikeys'
import {routeActions} from 'react-router-redux'
import React, { Component } from 'react'
import { connect } from 'react-redux'
//import Navbar from 'components/Navbar'
import Topbar from 'components/Topbar'
import 'css/app.less'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authDone: false,
      apiKeysDone: false
    }
  }

  onAuth = data => {
    console.log('on auth called')
    const { dispatch } = this.props
    if (data) {
      if (Object.keys(this.props.auth.user).length === 0) {
        firebaseRef
          .child('users')
          .child(data.uid)
          .once('value', snapshot => {
            if (!snapshot.exists()) {
              console.log('user does not exist')
              dispatch(routeActions.push('/login'))
              return
            }
            let userObject = snapshot.val()
            dispatch(userUpdated(Object.assign({}, userObject, {id: snapshot.key()})))
            firebaseRef.child('users')
              .child(data.uid)
              .update({
                lastLoginAt: Firebase.ServerValue.TIMESTAMP
              })
            })
            this.setState({authDone: true})
      }
        firebaseRef
          .child('users')
          .child(data.uid)
          .on('child_changed', snapshot => {
            dispatch(userUpdated({
              [snapshot.key()]: snapshot.val()
            }))
          })
        firebaseRef
        .child('apikeys')
        .child(data.uid)
        .once('value', snap => {
          if(snap.exists()) {
            console.log('got snap')
            dispatch(apiKeysRecieved(snap.val()))
            this.setState({
              apiKeysDone: true
            })
          }
        })

      }
    else {
      dispatch(routeActions.push('/login'))
    }
  };

  componentDidMount() {
    firebaseRef.onAuth(this.onAuth)
  }


  render() {
    if (Object.keys(this.state).map(k => this.state[k]).reduce((a, b) => a && b) !== true) {
      return (
        <div id='page-wrapper'> 
          loading
        </div>
      )
    }
    
    return (
      <div id="page-wrapper">
        <div id="content-wrapper">
          <Topbar user={ this.props.auth.user } />
          <div className='page-content'> 
            { React.cloneElement(this.props.children, {user: this.props.auth.user }) }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(App)
