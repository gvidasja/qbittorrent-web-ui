import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import Table from './Table'
import { FileSize } from './Formatting'
import useQueryString from '../hooks/useQueryString'
import DownloadModal from './DownloadModal'
import { useModal } from '../hooks/useModal'
import { preventDefault } from '../util'
import Layout from './Layout'
import Icon from './Icon'

const Search = () => {
  const history = useHistory()
  const [urlSearch, onSetUrlSearch] = useQueryString(history, 'query')
  const [search, setSearch] = useState(urlSearch)
  const [loading, setLoading] = useState(false)
  const [torrents, setTorrents] = useState()
  const [openDownloadModal] = useModal(DownloadModal)

  const onSearch = () => {
    setLoading(true)
    onSetUrlSearch(search)
    api.performSearch(search).then(t => {
      setTorrents(t)
      setLoading(false)
    })
  }

  const onDownload = (url, path) => api.downloadTorrent(url, path)

  return (
    <div>
      <form onSubmit={preventDefault(onSearch)}>
        <Layout direction="row" spaced style={{ margin: 6 }}>
          <input onChange={e => setSearch(e.target.value)} value={search} />
          <button>Search</button>
        </Layout>
      </form>

      <Table
        loading={loading}
        items={torrents || []}
        rowTitle={t => t.name}
        rowSubtitle={t => [
          `${t.seeders} | ${t.leechers}`,
          <FileSize value={t.size} />,
          <button
            onClick={() => openDownloadModal({ onOk: path => onDownload(t.magnetLink, path) })}
          >
            <Layout centered spaced direction="row">
              <Icon icon="download" />
              <span>Download</span>
            </Layout>
          </button>,
        ]}
      ></Table>
    </div>
  )
}

export default Search
