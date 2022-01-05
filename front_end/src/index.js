import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CRUD from './Components/crud';
import Home from './home';

function App(){
     

  return(
    <div>
      <a href='/'><h1>LOGO</h1><hr/></a>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/list" element={<CRUD/>} />
        </Routes>
      </Router>
    </div>
    
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

