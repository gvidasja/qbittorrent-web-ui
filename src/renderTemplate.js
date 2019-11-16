import React from 'react'
import { render } from 'react-dom'

const renderTemplate = Component => render(<Component></Component>, document.querySelector('#root'))

export default renderTemplate
