import React, { useState } from 'react'
import useFormReducer from '../hooks/useFormReducer'
import api from '../api'

const setField = (field, set) => e => set(field, e.target.value)

const ERROR = {
  400: 'Bad request',
  401: 'Unauthorized',
}

const Login = () => {
  const [error, setError] = useState()
  const [{ username, password }, set] = useFormReducer({ username: '', password: '' })

  const login = () =>
    api.login(username, password).then(r => (r.ok ? location.reload() : setError(ERROR[r.status])))

  return (
    <div>
      <input value={username} onChange={setField('username', set)}></input>
      <input value={password} onChange={setField('password', set)} type="password"></input>
      <button onClick={login} disabled={!username || !password}>
        Login
      </button>
      {error && (
        <div onClick={() => setError()} style={{ color: 'red' }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default Login
