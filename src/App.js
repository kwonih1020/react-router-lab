import React, { Component } from 'react';
import {
       BrowserRouter as Router,
       Route,
       Link,
       Redirect
       } from "react-router-dom"
import axios from "axios"
import Dashboard from "./Dashboard/Dashboard.js"
import Stock from "./Stock/Stock.js"
import About from "./About/About.js"
import Search from "./Search/Search.js"
// import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      stocks: [
        // {"name": "Apple Inc.", "symbol": "AAPL", "lastPrice": 140.64, "change": -0.280000000000001, "high": 141.74, "low": 140.35, "open": 141.5},
        // {"name": "Microsoft Corporation", "symbol": "MSFT", "lastPrice": 64.98, "change": 0.109999999999999, "high": 65.45, "low": 64.76, "open": 65.12},
        // {"name": "Alphabet Inc.", "symbol": "GOOGL", "lastPrice": 835.14, "change": -4.50999999999999, "high": 844, "low": 829.1, "open": 842},
        // {"name": "Facebook, Inc.", "symbol": "FB", "lastPrice": 140.34, "change": 0.810000000000002, "high": 141.0244, "low": 139.76, "open": 140.08},
        // {"name": "Oracle Corporation", "symbol": "ORCL", "lastPrice": 44.65, "change": -0.300000000000004, "high": 45.09, "low": 44.575, "open": 44.91},
        // {"name": "Intel Corporation", "symbol": "INTL", "lastPrice": 36.16, "change": -0.370000000000005, "high": 36.78, "low": 36.125, "open": 36.58}
      ],
      hasTracked: false
    }
    this.handleTrackedState = this.handleTrackedState.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3000/stocks").then((response) => {
      this.setState({
        stocks: response.data
      })
    })
  }
  handleTrackedState(newStock) {
    let tempArray = this.state.stocks
    tempArray.push(newStock)
    this.setState({
      stocks: tempArray,
      hasTracked: true
    })
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/search">Search</Link>
          </nav>
          <main>
            <Route
              exact path="/"
              render={() =>
                <Dashboard stocks={this.state.stocks}
              />}
            />
            <Route
              path="/about"
              component={About}
            />
            <Route
              path="/stocks/:symbol"
              component={Stock}
            />
            <Route path="/search" render={() => {
              if(this.state.hasTracked){
                return <Redirect to="/" />
              }
              return <Search handleTrackedState={this.handleTrackedState} />
            }} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
