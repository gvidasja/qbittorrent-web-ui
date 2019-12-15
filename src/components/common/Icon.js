import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faDownload } from '@fortawesome/free-solid-svg-icons'

const ICONS = {
  close: faTimes,
  download: faDownload,
}

const Icon = ({ icon, ...props }) => <FontAwesomeIcon {...props} icon={ICONS[icon]} />

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(ICONS)),
}

export default Icon
