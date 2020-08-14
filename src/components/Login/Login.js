import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token")
    console.log({'access_token' : token})

    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }

    this.state = {
      username: "",
      password: "",
      loggedIn,
      redirectToReferrer: false
    }

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  submitForm(e) {
    const { username, password } = this.state
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'cc7acc8d-80d6-450e-baf6-ad4a5f23892d');
    params.append('client_secret', 'react');
    params.append('username', username);
    params.append('password', password);
    e.preventDefault();

    const that = this;
    const session_url = 'http://localhost/d8react/oauth/token?_format=json';
    axios.post(session_url, params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

      .then(function (response) {
        localStorage.setItem("token", JSON.stringify(response.data.access_token))
        that.setState({
          loggedIn: true
        })
        document.body.dispatchEvent(new CustomEvent('onLogin', { loggedIn: true }));
      }).catch(function (error) {
        console.log('Error on Authentication aaa', error);
      });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/UserProfile" />
    }
    return (
      <div className="login-form">
        <form onSubmit={this.submitForm}>
          <div className="form-label">
            <label>username</label>
            <input type="text" placeholder="user name" name="username" className="form-text" value={this.state.username} onChange={this.onChange} />
          </div>
          <div className="form-label">
            <label>Password</label>
            <input type="password" placeholder="password" name="password" className="form-text" value={this.state.password} onChange={this.onChange} />
          </div>
          <div>
            <input type="submit" className="form-submit" />
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>
        </form>
      </div>

    )
  }
}

export default Login;