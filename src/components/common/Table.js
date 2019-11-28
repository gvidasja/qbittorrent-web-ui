import React from 'react'
import Layout from './Layout'
import { Col, Row } from './Flex'
import './Table.css'

const NOOP = () => {}

const TableRow = ({ title = '', subtitle = [], ...props }) => {
  const subtitleToRender = (Array.isArray(subtitle) ? subtitle : [subtitle]).map((s, index) => (
    <div key={index} className="subtitle">
      {s}
    </div>
  ))

  return (
    <Col {...props} className="table-row">
      <Row className="title">{title}</Row>
      <Row className="subtitle-container">{subtitleToRender}</Row>
    </Col>
  )
}

const Table = ({ items, loading, rowTitle = NOOP, rowSubtitle = NOOP }) => (
  <Layout full>
    {loading ? (
      <div>Loading</div>
    ) : (
      items.map(item => (
        <TableRow key={item.id} title={rowTitle(item)} subtitle={rowSubtitle(item)} key={item.id} />
      ))
    )}
  </Layout>
)

export default Table
