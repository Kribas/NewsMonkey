import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  
  render() {
    return (
      <>
              <Navbar/>
              <div className="container">
              <h1 className='my-3'>NewsMonkey top headlines</h1>
              </div>
              <News pageSize={5}/>
      </>
    )
  }
}

