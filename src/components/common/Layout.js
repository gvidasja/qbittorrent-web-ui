import React from 'react'
import './Layout.css'
import c from 'classnames'
import PropTypes from 'prop-types'
import Flex from './Flex'

const Layout = ({ centered, full, spaced, direction = 'col', ...props }) => (
  <Flex className={c('layout', { centered, full, spaced })} direction={direction} {...props}></Flex>
)

Layout.propTypes = {
  centered: PropTypes.bool,
  full: PropTypes.bool,
  spaced: PropTypes.bool,
}

export default Layout
