import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Intro from './Intro/Intro';
import Area from './Area/Area';
import Collision from './Collision/Collision';
import Motion from './Motion/Motion';
import Accident from './Accident/Accident';
import Rotation from './Rotation/Rotation';
import Gravity from './Gravity/Gravity';

export default class Routes extends Component {
  render() {
    const styles = require('./main.scss');
    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">Shazam</a>
              </div>
            </div>
          </nav>
          <div className="container-fluid text-center">
            <div className="row content">
              <div className="col-sm-2 sidenav">
                <p><Link to="/">Home</Link></p>
                <p><Link to="/Area">Area</Link></p>
                <p><Link to="/Collision">Collision</Link></p>
                <p><Link to="/Motion">Motion</Link></p>
                <p><Link to="/Accident">Accident</Link></p>
                <p><Link to="/Rotation">Rotation</Link></p>
                <p><Link to="/Gravity">Gravity</Link></p>
                <p><Link to="/Impact">Impact</Link></p>
              </div>
              <div className="col-sm-10 text-left">
                <Switch>
                <Route exact path="/" component={Intro} />
                <Route exact path="/Area" component={Area} />
                <Route exact path="/Collision" component={Collision} />
                <Route exact path="/Motion" component={Motion} />
                <Route exact path="/Accident" component={Accident} />
                <Route exact path="/Rotation" component={Rotation} />
                <Route exact path="/Gravity" component={Gravity} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
