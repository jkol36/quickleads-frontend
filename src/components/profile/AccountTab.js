import React, { Component } from 'react';
import { changeUser } from 'actions/auth'
import moment from 'moment'
import { Modal } from 'react-bootstrap'
import {firebaseRef} from 'config'

export default class AccountTab extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.onOldPasswordChange = this.onOldPasswordChange.bind(this)
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.removeMessage = this.removeMessage.bind(this)

    this.state = {
      showPasswordModal: false,
      oldPassword:'',
      newPassword:'',
      confirmPassword: '',
      error: null,
      message: null,
      displayCloseButton: false
    }
    this.togglePasswordModal = this.togglePasswordModal.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  submit(e) {
    e.preventDefault()
    let changes = {}
    const { dispatch } = this.props
    if (this.state.forumName !== this.props.forumName && this.state.forumName.length > 0)
      changes.forumName = this.state.forumName
    if (!!this.emailInput && this.emailInput.value.trim().length > 0) {
      changes.email = this.emailInput.value.trim()
    }
    if (Object.keys(changes).length > 0) {
      dispatch(changeUser(this.props.userId, changes))
    }
  }
  onClose() {
    this.setState({
      showPasswordModal: false
    })
  }
  togglePasswordModal(e) {
    e.preventDefault()
    this.setState({
      showPasswordModal: !this.state.passwordModalOpen
    })
  }

  onOldPasswordChange(e) {
    e.preventDefault()
    this.setState({
      oldPassword: e.target.value
    })
  }
  onNewPasswordChange(e) {
    e.preventDefault()
    this.setState({
      newPassword: e.target.value
    })
  }

  onConfirmPasswordChange(e) {
    e.preventDefault()
    this.setState({
      confirmPassword: e.target.value
    })
  }

  changePassword(e) {
    e.preventDefault();
    if(this.state.newPassword != this.state.confirmPassword) {
      return this.setState({
        error: `Password's don't match`
      })
    }

    firebaseRef.changePassword({
      email: this.props.email,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    }, (err)=> {
      if(err) {
        switch (err.code) {
          case 'INVALID_PASSWORD':
            this.setState({
              error: 'The specified password was incorrect'
            })
            break
          case 'INVALID_USER':
            this.setState({
              error: 'The user account does not exist'
            })
            break
          default:
            this.setState({
              error: 'Error changing password'
            })
        }
      }
      else {
        this.setState({
          message: 'Password changed successfully',
          newPassword: '',
          oldPassword: '',
          confirmPassword: '',
          displayCloseButton: true,
          showPasswordModal: false,
          error:null
        })
      }
    })
  }

  removeMessage(e) {
    e.preventDefault()
    this.setState({
      message: null,
      displayCloseButton: false
    })
  }

  render() {
    let message
    let closeButton
    if(this.state.message && this.state.displayCloseButton) {
      message = this.state.message
      closeButton = <span id='close-button' className='ion ion-close' onClick = {this.removeMessage}></span>
    }
    else {
      closeButton = null
    }

    return (
      <form className='form-horizontal' onSubmit={this.submit.bind(this)}>
        <p className='text-success'>{message}{closeButton}</p>
        <Modal show={this.state.showPasswordModal} onHide={this.onClose}>
          <Modal.Header closeButton>
            <Modal.Title> Change your password </Modal.Title>
            <p className='text-danger'> {this.state.error} </p>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <div className='row'>
                <label htmlFor='old-password' className='col-xs-4 control-label'> Your old password </label>
                <div className='col-xs-8'>
                  <input type='password' className='form-control' onChange={this.onOldPasswordChange} value={this.state.oldPassword} placeholder='Old Password'/>
                </div>
              </div>
              <div className='row'>
                <label htmlFor='new-password' className='col-xs-4 control-label'> Your new password </label>
                <div className='col-xs-8'>
                  <input type='password' className='form-control' onChange={this.onNewPasswordChange} value={this.state.newPassword} placeholder='New password '/>
                </div>
              </div>
              <div className='row'>
                <label htmlFor='confirm-password' className='col-xs-4 control-label'> Confirm Password </label>
                <div className='col-xs-8'>
                  <input type='password' className='form-control' onChange={this.onConfirmPasswordChange} value={this.state.confirmPassword}placeholder='Confirm password'/>
                </div>
              </div>
           </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='row'>
                <div className='col-md-12 text-center'>
                <button className='btn btn-default pull-right' onClick={this.onClose}> Close </button>
                <button className='btn btn-success pull-right' onClick={this.changePassword}> Change </button>
                </div>
              </div>
          </Modal.Footer>
        </Modal>
        <fieldset>
          <div className='form-group'>
            <label htmlFor='email' className='col-xs-2 control-label'>Email</label>
            <div className='col-xs-10'>
              { (!this.props.email || this.props.email === 'no@email.com') ? (<input type='email' placeholder='your@email.com' className='form-control' ref={ref => this.emailInput = ref} />) : (
                <input type='text' disabled value={(this.props.email === 'no@email.com') ? 'Add email' : this.props.email} readOnly={true} className='form-control' />)
              }
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='verified' className='col-xs-2 control-label'>Verified</label>
            <div className='col-xs-10'>
              <input type='text' disabled value={this.props.verified ? 'Yes' : 'No'} readOnly={true} className='form-control' />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='change-password' className='col-xs-2 control-label'>Password</label>
            <div className='col-xs-10'>
              <div className='input-group'>
                <input type='password' value='nicetry' className='form-control' disabled />
                <span className='input-group-addon'>
                  <a href='#'t onClick={this.togglePasswordModal}> (Change) </a>
                </span>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='createdAt' className='col-xs-2 control-label'>Member since</label>
            <div className='col-xs-10'>
              <input type='text' disabled value={moment(this.props.createdAt).format('MMMM Do, YYYY')} readOnly={true} className='form-control' />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-xs-10 col-xs-offset-2'>
              <button type='submit' className='btn btn-primary'>Update</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}
