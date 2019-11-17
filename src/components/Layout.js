import React from 'react'
import './Layout.css'
import c from 'classnames'
import PropTypes from 'prop-types'
import { Col } from './Flex'

const Layout = ({ centered, full, spaced, ...props }) => (
  <Col className={c('layout', { centered, full, spaced })} {...props}></Col>
)

Layout.propTypes = {
  centered: PropTypes.bool,
  full: PropTypes.bool,
  spaced: PropTypes.bool,
}

export default Layout
