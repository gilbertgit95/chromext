import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ComponentTemplate extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }

    this.doThis = this.doThis.bind(this)
  }

  doThis() {
    console.log('it has been done!')
  }

  render() {
    return (
      <div>
        <button onClick={ this.doThis }>click me</button>
      </div>
    )
  }
}

export default ComponentTemplate