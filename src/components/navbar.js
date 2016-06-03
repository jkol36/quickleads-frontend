import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class NavbarComponent extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-main">
            <Link to='/dashboard'>
              <img src="/static/logo.png" className="img brand-logo"></img>
            </Link>
          </li>
          <li className="sidebar-list">
            <Link to="/dashboard">
              <i data-tip="Dashboard" className="ionicons ion-ios-home-outline" data-for="navbar"></i>
            </Link>
          </li>
          <li className="sidebar-list">
            <Link to="edgebets">
              <i data-tip="Edgebets" className="ionicons ion-ios-heart-outline" data-for="navbar"></i>
            </Link>
          </li>
          <li>
            <Link to="mybets">
              <i data-tip="My bets" className="ionicons ion-ios-list-outline" data-for="navbar"></i>
            </Link>
          </li>
           <li>
            <Link to="analytics">
              <i data-tip="Analytics" className="ionicons ion-ios-pie-outline" data-for="navbar"></i>
            </Link>
          </li>
          <li>
            <Link to="forum">
              <i data-tip="Forum" className="ionicons ion-ios-chatbubble-outline" data-for="navbar"></i>
            </Link>
          </li>
        </ul>
        <ReactTooltip place="right" effect="solid" id="navbar"/>
      </div>
    );
  }
}

export default connect(state => {
  return {
    auth: state.auth
  }
})(NavbarComponent)
