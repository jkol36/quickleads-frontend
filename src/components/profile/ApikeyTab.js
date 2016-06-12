import React, { Component, PropTypes } from 'react';
import {firebaseRef} from 'config'

export default class ApikeyTab extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      closeIOApiKey: this.props.closeIOApiKey,
      mailgunApiKey: this.props.mailgunApiKey,
      message: null
    }
    this.onCloseIOApiKeyChange = this.onCloseIOApiKeyChange.bind(this)
    this.onMailGunApiKeyChange = this.onMailGunApiKeyChange.bind(this)
    this.submit = this.submit.bind(this)
    
  }

  onMailGunApiKeyChange(e) {
    this.setState({
      mailgunApiKey: e.target.value
    })

  }
  onCloseIOApiKeyChange(e) {
    this.setState({
      closeIOApiKey: e.target.value
    })
  }
  submit(e) {
    e.preventDefault()
    firebaseRef.child('apikeys').child(this.props.userId).set({
      closeioApiKey: this.state.closeIOApiKey,
      mailgunApiKey: this.state.mailgunApiKey
    })

  }


  render() {
    return (
      <form className='form-horizontal'>
        <fieldset>
          <div className='form-group'>
            <label htmlFor='closioapikey' className='col-xs-2 control-label'>CloseIO APIKey</label>
            <div className='col-xs-10'>
              <div className='input-group'>
                <input type='text' className='form-control' value={this.state.closeIOApiKey} onChange={this.onCloseIOApiKeyChange}/>
                <span className='input-group-addon'> </span>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='mailgunAPIKey' className='col-xs-2 control-label'>mailgunAPIKey</label>
            <div className='col-xs-10 col-xs-offset-2'>
              <input type='text' className='form-control' value={this.state.mailgunApiKey} onChange={this.onMailGunApiKeyChange} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-xs-10 col-xs-offset-2'>
              <button type='submit' className='btn btn-primary' onClick={this.submit}>Update</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}
