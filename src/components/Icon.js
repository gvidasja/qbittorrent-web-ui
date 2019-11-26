import React from 'react'
import PropTypes from 'prop-types'

const ICON_SIZE = 12
const ICON_COLOR = '#5a5'

const ICONS = {
  download: (
    <>
      <div
        style={{
          left: `30%`,
          background: ICON_COLOR,
          position: 'absolute',
          width: '40%',
          height: '40%',
        }}
      ></div>
      <div
        style={{
          boxSizing: 'border-box',
          width: ICON_SIZE * 0.8,
          top: '40%',
          position: 'absolute',
          borderBottom: 'none',
          borderTop: `${ICON_SIZE * 0.6}px solid ${ICON_COLOR}`,
          borderLeft: `${ICON_SIZE * 0.4}px solid transparent`,
          borderRight: `${ICON_SIZE * 0.4}px solid transparent`,
        }}
      ></div>
    </>
  ),
}

const Icon = ({ icon, ...props }) => (
  <div
    {...props}
    style={{
      position: 'relative',
      display: 'flex',
      height: ICON_SIZE,
      width: ICON_SIZE,
      justifyContent: 'center',
      alignContent: 'center',
    }}
  >
    {ICONS[icon]}
  </div>
)

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(ICONS)),
}

export default Icon
