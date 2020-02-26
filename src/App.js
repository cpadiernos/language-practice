import React from 'react';
import './App.css';

import WordTest from './WordTest'

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      let width = window.innerWidth
      let height = window.innerHeight
      let viewport = document.querySelector("meta[name=viewport]")
      viewport.setAttribute("content", "height=" + height + ", width=" + width + ", initial-scale=1.0")
    }, 300)
  }
  
  render() {
    return (
      <main>
        <h1>Language Practice</h1>
        <p>Test yourself on the 100 most common words in French.</p>
        <WordTest />
      </main>
    )
  }
}

export default App;
