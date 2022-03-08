import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store/store'

import Login from './pages/Login';

import Layout from './components/Layout';
import Home from './pages/Home';
import Lights from './pages/Lights';
import Light from './pages/Light';
function App() {
  return (
    <div className="App h-full">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path='/lights' element={<Lights />}/>
              <Route path='/lights/:light' element={<Light />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
