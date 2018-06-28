import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { setUser } from '../actions/userActions'

const trelloAuthParams = {
  type: 'popup',
  name: 'Poker Planning',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never'
}

class Login extends Component {
  constructor (props) {
    super(props)
    if (localStorage.getItem('trello_token')) {
      window.Trello.authorize({
        ...trelloAuthParams,
        interactive: false,
        success: () => this.authenticationSuccess(),
        error: this.authenticationFailure
      })
    }
  }
  authenticationSuccess () {
    window.Trello.get(
      '/member/me',
      (res) => this.props.login(res),
      () => {
        localStorage.removeItem('trello_token')
      })
  }
  authenticationFailure () {}
  handleLoginButtonClick () {
    window.Trello.authorize({
      ...trelloAuthParams,
      success: () => this.authenticationSuccess(),
      error: this.authenticationFailure
    })
  }
  render () {
    return (
      <div className='Login'>
        <Button
          onClick={() => this.handleLoginButtonClick()}
          variant='contained'
          color='primary'
        >Login with Trello</Button>
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => {
  return {
    login: (res) => {
      dispatch(setUser(res.username, res.fullName))
      window.location.hash = '#/boards'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
