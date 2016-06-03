import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from 'actions/auth'

class Topbar extends Component {

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {
      showModal: false
    }
  }

  logout(e) {
    e.preventDefault()
    const { dispatch } = this.props
    console.log(dispatch)
    dispatch(logout())
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }

  showModal() {
    this.setState({
      showModal: true
    })
  }

  render() {
    return (
      <div className="row header">
        <div className="content">
          <div className="col-xs-2 col-sm-1 pull-right">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
              <i className="ionicons ion-ios-contact-outline" id='profile-icon'></i><span className='caret'> </span>
            </a>
            <ul className="dropdown-menu profile-menu">
              <li><Link to="/me">Profile</Link></li>
              <li><a href="/logout" onClick={this.logout}>Log out</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    state
  }
})(Topbar)

