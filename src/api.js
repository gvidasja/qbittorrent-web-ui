const encode = (data = {}) =>
  Object.entries(data)
    .map(pair => pair.map(encodeURIComponent))
    .map(pair => pair.join('='))
    .join('&')

const apiClient = baseUrl => ({
  get: url => fetch(`${baseUrl}/${url}`).then(r => r.json()),
  postForm: (url, data) =>
    fetch(`${baseUrl}/${url}`, {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: encode(data),
    }),
})

const { postForm, post, get } = apiClient('/api/v2')

const api = {
  login(username, password) {
    return postForm('auth/login', { username, password })
  },

  getTorrents() {
    return get('torrents/info')
  },
}

export default api
