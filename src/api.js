const encode = (data = {}) =>
  Object.entries(data)
    .map(pair => pair.map(encodeURIComponent))
    .map(pair => pair.join('='))
    .join('&')

const apiClient = baseUrl => ({
  postForm: (url, data) =>
    fetch(`${baseUrl}/${url}`, {
      method: 'post',
      headers: {
        'content-type': 'appication/x-www-form-urlencoded',
        referer: 'http://localhost:3000',
      },
      body: encode(data),
    }),
})

const { postForm, post, get } = apiClient('/api/v2/auth')

const api = {
  login(username, password) {
    return postForm('login', { username, password })
  },
}

export default api
