import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'

// the parent component
class Root extends Component {
  constructor() {
    super()

    this.state = {
      user: {}
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

export default Root