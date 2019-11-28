import { ApiClient } from './apiClient'
import MAP from './mapper.js'
import { repeat } from '../util'

class QBitTorrentApiClient extends ApiClient {
  constructor() {
    super('/api/v2')
  }

  _startSearch = async (query, plugins) => {
    const { id } = await this.postForm('search/start', {
      pattern: query,
      plugins: plugins.join(','),
      category: 'all',
    })

    return id
  }

  _getSearchResults = async id => {
    const { results, status, total } = await this.postForm('search/results', {
      id,
      offset: 0,
      limit: 500,
    })

    return {
      results: results.map(MAP.SEARCH_RESULT),
      status,
      total,
    }
  }

  login = (username, password) => this.postForm('auth/login', { username, password })

  search = async (query, plugins = ['rarbg']) => {
    const id = await this._startSearch(query, plugins)

    const { results } = await repeat(() => this._getSearchResults(id))
      .until(response => response.status === 'Stopped')
      .every(1)
      .seconds()

    return results
  }

  getTorrents = () => this.get('torrents/info').then(r => r && r.map(MAP.TORRENT))

  downloadTorrent = (url, path) =>
    this.postMultipartForm('torrents/add', {
      savepath: path,
      urls: url,
    })

  useAlternativeUi = () =>
    this.postMultipartForm('app/setPreferences', {
      json: JSON.stringify({
        alternative_webui_enabled: false,
      }),
    })
}

export { QBitTorrentApiClient }
