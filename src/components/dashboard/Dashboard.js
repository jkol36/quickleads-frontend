import React, { Component } from 'react'
import {connect} from 'react-redux'

import 'css/dashboard.less'

class Dashboard extends Component {

  constructor(props) {
    console.log('yooo')
    super(props)
  }


  componentDidMount() {
    console.log('dashboard mounted')
  }




  render() {
    return (
     <div> Dashboard </div>
    )
  }
}

export default connect(state => {
  return {
    state
  }
})(Dashboard)

