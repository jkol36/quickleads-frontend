import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from 'actions/auth'
import 'css/login.less'


class SignupComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.emailInput.focus()
  }


  handleSubmit(e) {
    e.preventDefault()
    console.log('called')
    if (this.props.auth.loading) return
    const email = this.emailInput.value
    const password = this.passwordInput.value
    if (email && password) {
      const { dispatch } = this.props
      dispatch(signup({
        email,
        password
      }))
    }
  }

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <strong>Oh snap,</strong> { this.props.auth.error }
      </div>
    );

    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div className="container-fluid signup-container">
        <div className="row">
          <div className='col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
            <img src="http://quickleads.herokuapp.com/static/img/logo.jpg" alt="logo" className="img img-responsive"></img>
            <div className='panel'>
              <div className="panel-body">
                { this.props.auth.error && alert }
                <form className="form-horizontal">
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope-o fa-fw"></i>
                      </span>
                      <input className="form-control" type="email" placeholder="email"
                          ref={(ref) => this.emailInput = ref}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control" type="password" placeholder="******"
                          ref={(ref) => this.passwordInput = ref}/>
                    </div>
                  </div>
                    <button type="submit" onClick={this.handleSubmit}
                      className="btn btn-primary">
                      { this.props.auth.loading ? spinner : 'Sign up'}
                    </button>
                </form>
              </div>
              <div className="panel-footer">
                <Link to="/login">Already have an account? Log in here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(SignupComponent)
