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
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension")
      if (request.greeting == "hello") {
        sendResponse({farewell: "goodbye"})
      }
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