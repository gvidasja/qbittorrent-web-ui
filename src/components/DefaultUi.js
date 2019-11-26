import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../api'

const DefaultUi = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.useAlternativeUi().then(() => setLoading(false))
  }, [])

  return loading ? <div>Redirecting to old UI</div> : <Redirect to="/" />
}

export default DefaultUi
