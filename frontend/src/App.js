import React from 'react';
import logo from './logo.svg';
import './App.css';


import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <div className="App">
      
       <BrowserRouter>
        <Routes>
          {routes.map((r, index) => (
            <Route key={index} path={r.path} element={React.createElement(r.component)} />
          ))}
        </Routes>
      </BrowserRouter>
         
    </div>
  );
}

export default App;
