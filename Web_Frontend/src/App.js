import {BrowserRouter,Route,Routes}from 'react-router-dom'
import './App.css';
import Main from './Main';

import React from 'react';
import Congestionview from './Congestionview';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/*" element={<Main />}></Route>
        <Route path="/Congestionview" element={<Congestionview />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
 