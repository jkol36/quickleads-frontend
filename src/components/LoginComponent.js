import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from 'actions/auth'
import 'css/login.less'

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      show:false
    }
  }


  componentDidMount() {
    this.emailInput.focus()
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(login({
      email: this.emailInput.value,
      password: this.passwordInput.value
    }))
  }







  render() {
    let alert = (
      <div className='alert alert-dismissible alert-warning'>
        <button type='button' className='close' data-dismiss='alert'>×</button>
        <strong>Oh snap!</strong> { this.props.auth.error }
      </div>
    );
    let spinner = <i className='fa fa-fw fa-spin fa-spinner'></i>

    return (
      <div className='container-fluid' ref='loginContainer'>
        <div className='col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4'>
          <img src="http://quickleads.herokuapp.com/static/img/logo.jpg" alt="logo" className="img img-responsive"></img>
          <div className='panel'>
            <div className='panel-body'>
              { this.props.auth.error && alert }
              <form className='form-horizontal'>
                <div className='form-group'>
                  <div className='input-group input-group-lg'>
                    <span className='input-group-addon'>
                      <i className='fa fa-envelope-o fa-fw'></i>
                    </span>
                    <input className='form-control' type='email' placeholder='email'
                        ref={ref => this.emailInput = ref}/>
                  </div>
                </div>
                  <div className='form-group'>
                  <div className='input-group input-group-lg'>
                    <span className='input-group-addon'>
                      <i className='fa fa-lock fa-fw'></i>
                    </span>
                    <input className='form-control' type='password' placeholder='******'
                        ref={ref => this.passwordInput = ref}/>
                  </div>
                </div>
                <button type='submit' onClick={this.handleSubmit} className='btn btn-primary'>
                  { this.props.auth.loading ? spinner : 'Login' }
                </button>
              </form>
            </div>
            <div className='panel-footer'>
              <Link to='/signup'>Don't have an account? Sign up here.</Link>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(LoginComponent)
