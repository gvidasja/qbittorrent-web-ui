import React from 'react'
import './Flex.css'
import c from 'classnames'
import PropTypes from 'prop-types'

const Flex = ({ className, children, direction = 'row', ...props }) => (
  <div {...props} className={c('flex', direction, className)}>
    {children && children}
  </div>
)

export const Row = props => <Flex {...props} direction="row" />
export const Col = props => <Flex {...props} direction="col" />

Flex.propTypes = {
  direction: PropTypes.oneOf(['row', 'col']).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
}

export default Flex
