import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Article extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true
    if (token == null) {
      loggedIn = false
    }

    this.state = {
      lists: {},
      isLoaded: false,
      currentOpenedIndex: -1,
      on: false,
      page: 1,
      loggedIn,
      token: token
    }

  }

  componentDidMount() {
    const url = "http://localhost/d8react/api/v1/article_react"
    // console.log({"token": this.state.token});
    axios.get(url,
      {
        headers:
        {
          "access-token": this.state.token,
          'Content-Type': 'application/json'
        }
      }


    )
      // axios.get(url) 
      .then(json => {
        this.setState({
          isLoaded: true,
          lists: json.data
        })
      }).catch(function (error) {
        console.log('Error on Authentication');
      });
  }


  render() {
    const { isLoaded, lists } = this.state;
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />
    }
    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {

      return (

        <div className="article-content">
          <ul>
            {lists.map((item, i) =>
              <li className="artcle-group" key={i}>
                <div><img src={`http://localhost:80${item.field_image}`} alt={item.image + '  image'} /> </div>
                <div>
                <div><b>{item.title} </b></div>
                <div className="article-desc" dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
                
              </li>

            )}
          </ul>
        </div>
      )
    }
  }
}
export default Article;