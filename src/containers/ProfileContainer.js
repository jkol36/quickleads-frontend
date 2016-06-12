import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'
import ApikeyTab from 'components/profile/ApikeyTab'
import AccountTab from 'components/profile/AccountTab'
import '../css/profile.less'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apikeys: this.props.apikeys
    }
  }



  render() {
    console.log(this.state)
    return (
      <div className='col-md-8 col-md-offset-2 col-xs-12'>
        <div className='panel profile'>
          <div className='panel-body'>
            <Tabs>
              <TabList>
                <Tab>ACCOUNT</Tab>
                <Tab>APIKEYS</Tab>
              </TabList>
              <TabPanel>
                 <AccountTab
                  email={ this.props.user.email }
                  verified={ this.props.user.verified }
                  forumName={ this.props.user.forumName }
                  dispatch={ this.props.dispatch }
                  userId={ this.props.user.id }
                  createdAt={ this.props.user.createdAt }
                  />
              </TabPanel>
              <TabPanel>
                <ApikeyTab userId={this.props.user.id} closeIOApiKey={this.state.apikeys.closeioApiKey} mailgunApiKey={this.state.apikeys.mailgunApiKey}/>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    apikeys: state.apikeys
  }
})(ProfileContainer)
