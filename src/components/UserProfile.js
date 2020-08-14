import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
         const token = localStorage.getItem("token");
 
         this.state = {
            token: JSON.parse(token),
            profile: {}
          }
 
    }

    componentDidMount() {
        const url = "http://localhost/d8react/preeti?_format=json"
        axios.get(url, 
        { 
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${this.state.token}`
          }
        })
        
        .then(json => {
            this.setState({
              profile: json.data[0]
            })
          }).catch(function(error) {
              console.log('Error on Authentication');
          });
    }

    render() {
        const {profile} = this.state;
        
        return (
            <div className="profile">
                <h2>User Profile</h2>
             <div className="profle-data">
                <div> Name: { profile.name } </div>
                <div> Email: { profile.mail } </div>
                <Link to="/EditProfile">Edit Profile</Link>
             </div>
            </div>
        )
    }
}
