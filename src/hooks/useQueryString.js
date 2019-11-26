import { useState, useCallback } from 'react'
import { parse, stringify } from 'querystring'

const getQueryParamValue = (history, key) => parse(history.location.search.slice(1))[key]

const setQueryParamValue = (history, key, value) => {
  const queryString = stringify({ ...parse(history.location.search.slice(1)), [key]: value })

  history.push(`${history.location.pathname}?${queryString}`)
}

const useQueryString = (history, key, initialValue = '') => {
  const [value, setValue] = useState(getQueryParamValue(history, key) || initialValue)

  const onSetValue = useCallback(newValue => {
    setValue(value)
    setQueryParamValue(history, key, newValue)
  }, [])

  return [value, onSetValue]
}

export default useQueryString
