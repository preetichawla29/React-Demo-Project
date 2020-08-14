import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home/HomePage';
import RegisterForm from './components/Register/Register';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import Article from './components/Article/Article';
import Logout from './components/Login/Logout';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

function isAuth() {
  const sessionToken = localStorage.getItem('token')
  return sessionToken;
}
const PrivateRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={props => (
      isAuth() !== null ? (
        < Component  {...props} />
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
          />
        )
    )}
    />
  )
};

export default class App extends Component {
  state = {
    loggedIn: false,
  };

  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={RegisterForm} />
        <Route path="/login" exact component={Login} />
        <Route path="/article" exact component={Article} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/UserProfile" component={UserProfile} />
        <PrivateRoute exact path="/EditProfile" component={EditProfile} />
      </Router>
    )
  }
}
