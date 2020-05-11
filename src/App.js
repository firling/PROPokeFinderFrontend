import React from 'react';
import './App.css';
import PokeFinder from './PokeFinder'

function App() {
  return (
    <div className="App">
      <div className="block">
        <h1 className="title is-1 color-title">Pokemon Revolution Online Poke Finder</h1>
        <p className="subtitle color-title">If you find any bugs / things which need to be changed, feel free to contact me on Discord (Firling#0443)</p>
      </div>
      <div className="container">
        <PokeFinder />
      </div>
    </div>
  );
}

export default App;
