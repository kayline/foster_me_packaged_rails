import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SplashPageHeader from './shared/SplashPageHeader.js'
import FosterFamilyList from './pages/FosterFamilyList.js';
import FosterFamilyDetail from './pages/FosterFamilyDetail.js';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/foster-families/:id" component={FosterFamilyDetail} />
    </div>
  </Router>
);

const Home = () => (
  <div className="App">
    <SplashPageHeader/>
    <p className="App-intro">
      This app will help you manage your foster animals. Thank you for fostering!
    </p>
    <FosterFamilyList/>
    <p className="attribution">animal paw by rupa c from the Noun Project</p>
  </div>
)

export default App