import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import Newz from './components/Newz';

export default class App extends Component {
  render() {
    return (
      <>
        <NavBar/>
        <Newz/>
      </>
    )
  }
}
