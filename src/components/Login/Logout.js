import React, { Component } from 'react'

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem("token")
    }
    render() {
        return (
            <div>
              Yes you have logged Out  
            </div>
        )
    }
}

export default Logout