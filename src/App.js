import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import Newz from './components/Newz';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 9

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<Newz setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<Newz setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<Newz setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<Newz setProgress={this.setProgress} key="genera;" pageSize={this.pageSize} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<Newz setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<Newz setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
            <Route exact path="/sports" element={<Newz setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={<Newz setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}
