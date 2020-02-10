import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

import ComponentTemplate from '../components/componentTemplate.jsx'

const app = document.createElement('div')
document.body.append(app)

app? ReactDOM.render(<div><ComponentTemplate></ComponentTemplate></div>, app): false;