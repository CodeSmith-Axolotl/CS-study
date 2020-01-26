import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import OOP from './components/OOP.jsx';
import DATASTRUCTURES from './components/DATASTRUCTURES.jsx';
import GIT from './components/GIT.jsx';
import ALGORITHMS from './components/ALGORITHMS.jsx';


/* want to do the routing in our index.js where we actually render the elements

// might be able to pass state into different route paths and components here
// for example if we can pass state into component OOPROUTE TEST
// using the inline render function 

*/

// creating a router component here that will be rendered to 
class RoutingApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      units: [],
      postDidMount: false,
    }

  }


  componentDidMount() {


    // fetching state after component mounts
    const unitsURL = '/units'
    fetch(unitsURL)
      .then(data => data.json())
      .then(data => {
        console.log('MY UNITS DATA:', data);
        this.setState({
          units: data,
          postDidMount: true,
        })
      })
      .catch(err => console.log('ERROR:', err));
  }

  render() {

    // can render the different routes here

    if (!this.state.postDidMount) {
      return <h1>We LOADING BABY!</h1>
    }


    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/OOP"
            render={() => <OOP state={this.state.units[0]} />} />
          <Route path="/DATA STRUCTURES"
            render={() => <DATASTRUCTURES state={this.state.units[1]} />}
          />
          <Route path="/GIT and GITHUB"
            render={() => <GIT state={this.state.units[2]} />}
          />
          <Route path="/ALGORITHMS"
            render={() => <ALGORITHMS state={this.state.units[3]} />}
          />
        </div>
      </Router>
    )
  }
}




render(<RoutingApp />, document.getElementById('app'));