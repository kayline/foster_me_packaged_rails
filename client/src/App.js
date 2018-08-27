import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home.js'
import NotFound from './pages/NotFound.js'
import FosterFamilyDetail from './pages/FosterFamilyDetail.js'
import NewFosterFamily from './pages/NewFosterFamily.js'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/foster-families/new" component={NewFosterFamily} />
      <Route exact path="/foster-families/:id" component={FosterFamilyDetail} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default App