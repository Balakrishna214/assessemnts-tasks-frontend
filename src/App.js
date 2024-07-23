import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import TasksPage from './components/TasksPage'
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register"  component={RegistrationForm} />
      <ProtectedRoute exact path="/"  component={Home}/>
      <ProtectedRoute exact path="/contact"  component={Contact}/>
      <ProtectedRoute exact path="/about"  component={About}/>
      <ProtectedRoute exact path="/tasks-page"  component={TasksPage}/>
    </Switch>
  </BrowserRouter>
);

export default App;
