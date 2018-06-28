import React, { Component } from 'react'

import { Route, Switch } from 'react-router'

import { HashRouter } from 'react-router-dom'
import Login from './Pages/Login'
import Main from './Pages/Main'
import Boards from './Pages/Boards'
import './App.css'

window.location.hash = '#/login'

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/boards' component={Boards} />
            <Route path='/' component={Main} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
