import React from 'react'
import Layout from './Layout'
import { HashRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom'
import Torrents from './Torrents'
import Search from './Search'
import Login from './Login'
import { Row } from './Flex'
import { ModalProvider } from '../hooks/useModal'
import DefaultUi from './DefaultUi'
import './App.css'

const App = () => (
  <Layout full>
    <ModalProvider>
      <Router>
        <Row className="navigation-menu">
          <NavLink to="/torrents">Torrents</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/default-ui">Use Default UI</NavLink>
        </Row>
        <Switch>
          <Route path="/torrents" component={Torrents} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/default-ui" component={DefaultUi} />
          <Redirect to="/torrents" />
        </Switch>
      </Router>
    </ModalProvider>
  </Layout>
)

export default App
