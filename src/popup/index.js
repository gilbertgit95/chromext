import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

import Root from './root.jsx'

const app = document.createElement('div')
document.body.append(app)

app? ReactDOM.render(<Root></Root>, app): false;