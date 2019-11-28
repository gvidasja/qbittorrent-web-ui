import React, { useState } from 'react'
import { preventDefault } from '../util'
import { Card, Layout } from './common'

const CATEGORIES = {
  tv: 'TV',
  movies: 'Movies',
}

const DownloadModal = ({ onOk }) => {
  const [category, setCategory] = useState(CATEGORIES.tv)
  const [subfolder, setSubfolder] = useState('')

  return (
    <Card>
      <form onSubmit={preventDefault(() => onOk(`D:/plex/${category}/${subfolder}`))}>
        <Layout spaced>
          <select
            placeholder="Select category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {Object.entries(CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {category === CATEGORIES.tv && (
            <input
              value={subfolder}
              onChange={e => setSubfolder(e.target.value)}
              placeholder="Enter TV show"
            ></input>
          )}

          <div></div>

          <button>Download</button>
        </Layout>
      </form>
    </Card>
  )
}

export default DownloadModal
