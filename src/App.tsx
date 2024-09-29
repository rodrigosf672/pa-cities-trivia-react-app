import React from 'react';
import './App.css';
import GameGrid from './components/GameGrid';  // Import the GameGrid component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>16 Cities of Pennsylvania Challenge!</h1>
        <GameGrid />  {/* Use the GameGrid component */}
      </header>
    </div>
  );
}

export default App;
