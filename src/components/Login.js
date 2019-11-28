import React, { useState } from 'react'
import useFormReducer from '../hooks/useFormReducer'
import './Login.css'
import { preventDefault } from '../util'
import api from '../api'
import { Card, Layout } from './common'

const setField = (field, set) => e => set(field, e.target.value)

const ERROR = {
  400: 'Bad request',
  401: 'Unauthorized',
}

const Login = props => {
  const [error, setError] = useState()
  const [{ username, password }, set] = useFormReducer({ username: '', password: '' })

  const login = () =>
    api.login(username, password).then(r => (r ? (location.href = '/') : setError(ERROR[r.status])))

  return (
    <Layout full centered {...props}>
      <Card>
        <form onSubmit={preventDefault(login)}>
          <Layout spaced>
            <input
              placeholder="Username"
              value={username}
              onChange={setField('username', set)}
            ></input>
            <input
              placeholder="Password"
              value={password}
              onChange={setField('password', set)}
              type="password"
            ></input>
            <button type="submit" disabled={!username || !password}>
              Login
            </button>
            {error && (
              <div onClick={() => setError()} style={{ color: 'red' }}>
                {error}
              </div>
            )}
          </Layout>
        </form>
      </Card>
    </Layout>
  )
}

export default Login
