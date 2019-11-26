import axios from 'axios'
import { stringify } from 'querystring'

const delay = time => new Promise(r => setTimeout(r, time))

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

const apiClient = baseUrl => {
  const client = axios.create({ baseURL: baseUrl })

  return {
    get: url => client.get(url).then(r => r.data, handleError),
    postForm: (url, data) => client.post(url, stringify(data)).then(r => r.data, handleError),
    postMultipartForm: (url, data) =>
      client
        .post(url, toFormData(data), { headers: { 'content-type': 'multipart/form-data' } })
        .then(r => r.data, handleError),
  }
}

const { postForm, postMultipartForm, post, get } = apiClient('/api/v2')

async function startSearch(query, plugins = ['rarbg']) {
  const { id } = await postForm('search/start', {
    pattern: query,
    plugins: plugins.join(','),
    category: 'all',
  })

  return id
}

async function getSearchResults(id) {
  const { results, status, total } = await postForm('search/results', {
    id,
    offset: 0,
    limit: 500,
  })

  return {
    results: results.map(
      ({
        descrLink: descriptionLink,
        fileName: name,
        fileSize: size,
        fileUrl: magnetLink,
        nbLeechers: leechers,
        nbSeeders: seeders,
        siteUrl,
      }) => ({
        id: magnetLink,
        name,
        size,
        magnetLink,
        siteUrl,
        descriptionLink,
        seeders,
        leechers,
      })
    ),
    status,
    total,
  }
}

const api = {
  login(username, password) {
    return postForm('auth/login', { username, password })
  },

  async performSearch(query) {
    const id = await startSearch(query)

    let status, results

    while (status !== 'Stopped') {
      let { results: r, status: s } = await getSearchResults(id)

      status = s
      results = r

      await delay(1000)
    }

    return results
  },

  getTorrents() {
    return get('torrents/info').then(
      r =>
        r &&
        r.map(
          ({
            hash: id,
            name,
            dlspeed: downloadSpeed,
            upspeed: uploadSpeed,
            progress,
            size,
            num_seeds: seeders,
            num_leechs: leechers,
            ratio,
          }) => ({
            id,
            name,
            downloadSpeed,
            uploadSpeed,
            progress,
            size,
            seeders,
            leechers,
            ratio,
          })
        )
    )
  },

  downloadTorrent(url, path) {
    return postMultipartForm('torrents/add', {
      savepath: path,
      urls: url,
    })
  },

  useAlternativeUi() {
    return postMultipartForm('app/setPreferences', {
      json: JSON.stringify({
        alternative_webui_enabled: false,
      }),
    })
  },
}

export default api
