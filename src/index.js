import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import PomodoroClock from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PomodoroClock />
  </React.StrictMode>
);

