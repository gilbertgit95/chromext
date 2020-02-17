import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

// the parent component
export default class Root extends Component {
  constructor() {
    super()

    this.state = {
      user: {},
      activeView: 'LOGOUT_VIEW', // LOGOUT_VIEW || LOGIN_VIEW
    }
  }

  componentDidMount() {
    chrome.runtime.sendMessage({greeting: "hello"}, (response) => {
      console.log(response.farewell)
    })
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div><Button variant="contained" color="primary">Test Btn</Button></div>
    )
  }
}