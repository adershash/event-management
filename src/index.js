import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import { Context, FirebaseContext } from './store/FirebaseContext';
import { db } from './firebase/Config';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <FirebaseContext.Provider value={{db}}>
      <Context>
    <Router>
    <App />
    </Router>
    </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

