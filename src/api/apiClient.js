import axios from 'axios'
import { stringify } from 'querystring'

const handleError = r => {
  switch (r.status) {
    case 403:
    case 401:
      location.hash = '/login'
  }
}

const toFormData = (data = {}) =>
  Object.entries(data).reduce(
    (form, [key, value]) => form.append(key, value) || form,
    new FormData()
  )

class ApiClient {
  constructor(baseUrl) {
    this._client = axios.create({ baseURL: baseUrl })
  }

  get = url => this._client.get(url).then(r => r.data, handleError)
  postForm = (url, data) => this._client.post(url, stringify(data)).then(r => r.data, handleError)
  postMultipartForm = (url, data) =>
    this._client
      .post(url, toFormData(data), { headers: { 'content-type': 'multipart/form-data' } })
      .then(r => r.data, handleError)
}

export { ApiClient }
