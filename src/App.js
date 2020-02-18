import React from 'react';
import './App.css';

import WordTest from './WordTest'

class App extends React.Component {
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
