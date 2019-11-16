import { useReducer, useEffect } from 'react'

const NOOP = () => {}

const ACTION = {
  RESET: 'RESET',
  UPDATE: 'UPDATE',
}

const formReducer = (state, { type, ...action }) => {
  switch (type) {
    case ACTION.RESET:
      return action.newState
    case ACTION.UPDATE:
      return { ...state, [action.key]: action.value }
    default:
      throw new Error(`Invalid action ${type}: ${JSON.stringify(action, null, 2)}`)
  }
}

const useFormReducer = (initialState = {}, onChange = NOOP) => {
  const [form, dispatch] = useReducer(formReducer, initialState)

  useEffect(() => {
    onChange(form)
  }, [form])

  const set = (key, value) => dispatch({ type: ACTION.UPDATE, key, value })
  const reset = (newState = {}) => dispatch({ type: ACTION.RESET, newState })

  return [form, set, reset]
}

export default useFormReducer
