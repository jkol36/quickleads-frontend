import React, {Component} from 'react'
import {firebaseRef} from 'config'
import {Modal} from 'react-bootstrap'


export default class ResetPasswordModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message:null,
      error: null,
      email: ''
    }
    this.emailChange = this.emailChange.bind(this)
    this.passwordReset = this.passwordReset.bind(this)
    this.hideError = this.hideError.bind(this)
    this.hideMessage = this.hideMessage.bind(this)
  }

  passwordReset(e) {
    e.preventDefault();
    firebaseRef.resetPassword({
      email:this.state.email
    }, (err)=> {
      if(err) {
        switch(err.code) {
          case 'INVALID_USER':
            this.setState({
              error: 'A user matching that email cannot be found'
            })
            break
          default:
            this.setState({
              error: 'Something bad happened trying to reset your password.'
            })
        }
      }
      else {
        this.setState({
          message: 'A temporary password has been sent to your email!',
          email: '',
          error:null
        })
      }
    })
  }


  emailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    })
  }

  hideError() {
    this.setState({
      error: null
    })
  }

  hideMessage() {
    this.setState({
      message: null
    })
  }



  render() {
    let message
    let error
    if(this.state.error) {
      error = <p className='text-danger'> {this.state.error} <i className='ion ion-close' onClick={this.hideError}></i></p>
    }
    if(this.state.message) {
      message = <p className='text-success'> {this.state.message} <i className='ion ion-close' onClick={this.hideMessage}></i></p>
    }
    else {
      message = null
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title> Let's reset your password </Modal.Title>
          {error}
          {message}
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <div className='row'>
              <label htmlFor='email' className='col-xs-2 control-label'> Your Email </label>
              <div className='col-xs-10'>
                <input type='text' className='form-control' onChange={this.emailChange} />
              </div>
            </div>
            <div className='row text-center'>
              <button id='passwordResetButton' onClick={this.passwordReset}className='btn btn-primary'> Reset Password </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
