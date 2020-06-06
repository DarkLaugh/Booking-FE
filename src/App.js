import React from 'react';
import Navbar from './components/Navbar'
import ResortList from './components/ResortList'
import RegisterResortForm from './components/RegisterResortForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Route path="/" exact component={ResortList} />
        <Route path="/resort/register" component={RegisterResortForm} />
      </div>
    </Router>
  );
}

export default App;
