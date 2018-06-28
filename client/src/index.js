import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import Root from './App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

const store = configureStore()

const App = () => (<Provider store={store}><Root /></Provider>)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
