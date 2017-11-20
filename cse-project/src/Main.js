import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './redux/store'
import App from './components/containers/App'

class Main extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default Main
