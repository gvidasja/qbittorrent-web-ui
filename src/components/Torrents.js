import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import api from '../api'

const SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB']

const formatNumber = (num, decimals) => num.toFixed(decimals)

const formatSize = num => {
  let unitIndex = 0

  while (num / 1024 > 1 && unitIndex < SIZE_UNITS.length) {
    unitIndex++
    num /= 1024
  }

  return `${formatNumber(num, 2)} ${SIZE_UNITS[unitIndex]}`
}

const formatPercent = num => `${formatNumber(num * 100, 2)}%`

const formatSpeed = num => `${formatSize(num)}/s`

const GridRow = ({ children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `40% repeat(${children.length}, 1fr)` }}>
    {children}
  </div>
)

const Torrents = () => {
  const [transfers, setTransfers] = useState()
  const [refresh, setRefresh] = useState(Date.now())

  useEffect(() => {
    api.getTorrents().then(setTransfers)
  }, [refresh])

  useEffect(() => {
    const interval = setInterval(() => setRefresh(Date.now()), 2000)
    return () => clearInterval(interval)
  })

  return (
    <Layout full>
      {transfers &&
        transfers.map(t => (
          <GridRow key={t.hash}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t.name}
            </div>
            <div>{formatSize(t.size)}</div>
            <div style={{ display: 'flex', position: 'relative' }}>
              <div
                style={{
                  background: 'blue',
                  position: 'absolute',
                  height: '100%',
                  width: `${t.progress * 100}%`,
                }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {formatPercent(t.progress)}
              </div>
            </div>
            <div>{formatSpeed(t.dlspeed)}</div>
            <div>{formatSpeed(t.upspeed)}</div>
          </GridRow>
        ))}
    </Layout>
  )
}

export default Torrents
