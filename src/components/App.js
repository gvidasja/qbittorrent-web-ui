import React from 'react'
import Layout from './Layout'
import { HashRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom'
import Torrents from './Torrents'
import { Row } from './Flex'

const App = () => (
  <Layout full>
    <Router>
      <Row>
        <NavLink to="/torrents">Torrents</NavLink>
      </Row>
      <Switch>
        <Route path="/torrents" component={Torrents} />
        <Redirect to="/torrents" />
      </Switch>
    </Router>
  </Layout>
)

export default App
