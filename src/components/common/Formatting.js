import React from 'react'

const SIZE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB']

export const formatNumber = (num, decimals) => num.toFixed(decimals)

export const formatSize = num => {
  let unitIndex = 0

  while (num / 1024 > 1 && unitIndex < SIZE_UNITS.length) {
    unitIndex++
    num /= 1024
  }

  return `${formatNumber(num, 2)} ${SIZE_UNITS[unitIndex]}`
}

export const formatPercent = num => `${formatNumber(num * 100, 2)}%`

export const formatSpeed = num => `${formatSize(num)}/s`

export const Number = ({ value = 0, decimals = 2 }) => `${formatNumber(value, decimals)}`

export const FileSize = ({ value = 0 }) => formatSize(value)

export const TransferSpeed = ({ value = 0 }) => formatSpeed(value)

export const ProgressBar = ({ value = 0, maxValue = 1 }) => (
  <div style={{ width: '100%', display: 'flex', position: 'relative' }}>
    <div
      style={{
        background: '#5aa',
        position: 'absolute',
        height: '100%',
        width: `${(value / maxValue) * 100}%`,
      }}
    ></div>
    <div
      style={{
        border: '1px solid #ddd',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {formatPercent(value / maxValue)}
    </div>
  </div>
)
