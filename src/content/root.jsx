import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
      <div>Root Component</div>
    )
  }
}

export default Root