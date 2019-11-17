import React from 'react'
import { render } from 'react-dom'
import './index.css'

const renderTemplate = Component => render(<Component></Component>, document.querySelector('#root'))

export default renderTemplate
