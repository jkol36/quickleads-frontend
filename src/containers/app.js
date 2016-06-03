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
    }
  }


  render() {
    
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
