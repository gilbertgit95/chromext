import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// the current app being used
// you ca change this to any where you want
import Root from './../otto/modules/popup/root.jsx'

const app = document.createElement('div')
document.body.append(app)

app? ReactDOM.render(<Root></Root>, app): false;