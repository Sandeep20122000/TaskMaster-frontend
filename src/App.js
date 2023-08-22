import React from 'react'
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Sigin from './pages/Signin'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard';

const App = () => {

  return (
    <div className="App">

      <Routes>
        <Route path="/" Component={Welcome} />
        <Route path="/login" Component={Login} />
        <Route path="/signin" Component={Sigin} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </div>
  );
}

export default App;
