import React from 'react'
import api from '../api'

const DefaultUi = () => {
  api.useAlternativeUi().then(() => (location.href = '/'))

  return <div>Redirecting to old UI</div>
}

export default DefaultUi
