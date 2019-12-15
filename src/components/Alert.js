import React, { useState, useEffect } from 'react'
import { Row, Icon } from './common'
import c from 'classnames'

export const ALERT_TYPE = {
  INFO: 'info',
  ERROR: 'error',
}

const Alert = ({ type, message, onClose, timeOut }) => {
  const [timeOutRef, setTimeOutRef] = useState()

  useEffect(() => {
    timeOut && setTimeOutRef(setTimeout(() => onClose(), timeOut))

    return () => timeOutRef && clearTimeout(timeOutRef)
  }, [timeOut])

  return (
    <Row className={c('alert', type)}>
      <div>{message}</div>
      {onClose && <Icon icon="close" onClick={onClose} style={{ cursor: 'pointer' }} />}
    </Row>
  )
}

export default Alert
