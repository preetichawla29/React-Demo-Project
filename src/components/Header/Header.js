import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo  from '../../logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token")
    let loggedIn = true;
    if(token == null){
        loggedIn = false
    }

    this.state = {
      loggedIn
    }

    this.logoutClick = this.logoutClick.bind(this);
    this.userlogstatus = this.userlogstatus.bind(this);
  }

  userlogstatus(value) {
    this.setState({loggedIn: true})
  }

  componentDidMount() {
    document.body.addEventListener('onLogin', this.userlogstatus);
  }

  componentWillUnmount() {
    document.body.removeEventListener('onLogin');
  }
  
  logoutClick() {
    localStorage.removeItem("token");
    this.setState({loggedIn: false});
  }

    render(){

      let loginCheck,userCheck, loginArticle, loginProfile
      if (this.state.loggedIn) {
       
        loginArticle = <NavLink to="/article" >Article</NavLink>
        loginCheck = <NavLink to="/login" id="logout-link" onClick={this.logoutClick}>Logout</NavLink>
        loginProfile = <NavLink to="/UserProfile">User Profile</NavLink>
        userCheck =  <NavLink to="/EditProfile" className="edit-profile"></NavLink>
      } else {
        loginCheck= <NavLink to="/login">Login</NavLink>
       
      }
        return(
            <header>
              <div className="logo">
                <a href="/home"> <img src={logo} alt=''/></a></div>
                 <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {loginArticle}
            </li>
            <li>
              {loginProfile}
            </li>
            <li>{loginCheck}</li>
            <li>{userCheck}</li>
          </ul>
        </nav>
            </header>
        )
    }

    
}

export default Header;