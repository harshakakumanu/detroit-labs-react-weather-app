import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Forecast from './components/Forecast/Forecast';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/forecast" component={Forecast} />
      </BrowserRouter>
    </div>
  );
}

export default App;
