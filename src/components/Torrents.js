import React, { useEffect, useState } from 'react'
import api from '../api'
import Table from './Table'
import { FileSize, TransferSpeed, ProgressBar, Number } from './Formatting'

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
    <Table
      loading={!transfers}
      items={transfers}
      rowTitle={item => item.name}
      rowSubtitle={t => [
        <ProgressBar value={t.progress} />,
        <FileSize value={t.size} />,
        <TransferSpeed value={t.downloadSpeed} />,
        <TransferSpeed value={t.uploadSpeed} />,
        `${t.seeders} | ${t.leechers}`,
        <Number value={t.ratio} decimals={2} />,
      ]}
    />
  )
}

export default Torrents
