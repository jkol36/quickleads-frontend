import React from 'react'
import { connect } from 'react-redux'
import { firebaseRef } from 'config'
import { loginSuccess } from 'actions/auth'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('login component mounted')
    let authData = firebaseRef.getAuth()
    if (authData) {
      const { dispatch } = this.props
      firebaseRef.child('users').child(authData.uid).once('value', snap => {
        if (snap.exists())
          dispatch(loginSuccess())
      })
    }
  }

  render() {
    return (
      <div className='login-container'>
        { this.props.children }
      </div>
    )
  }
}

export default connect(state => ({auth: state.auth}))(LoginContainer)
