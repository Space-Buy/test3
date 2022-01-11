import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Create from './Components/create';
import Detail from './Components/detail';
import CRUD from './Components/list';
import Update from './Components/update';
import Home from './home';

function App(){
  return(
    <div>
      <a href='/'><h1>LOGO</h1><hr/></a>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
    
          <Route path="/list" element={
            <div><a href="/create"><h2>Create Items</h2></a><CRUD/></div>
          } />

          <Route exact path="/create" element={<Create/>} />
          <Route exact path={`/detail/:id`} element={<Detail/>} />
          <Route exact path={`/update/:id`} element={<Update/>} />


        </Routes>
      </Router>
      <div>
        <hr/>
        <h3>Foot bar</h3>
      </div>
    </div>
    
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

