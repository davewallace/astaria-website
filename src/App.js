import React from "react";

// Routing, as described here: https://reacttraining.com/react-router/web/
// Add 'Rediect' to this chain if it is needed at some point, there's an example
// commented out within the Router block below.
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// View imports
import ViewHome from './views/Home'

// Style
import './App.css';

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/client">Client</Link>
        </li>
        <li>
          <Link to="/maps">Maps</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
        </li>
      </ul>

      <hr />

      {/* Using a Switch allows us to declare our expected routes, while also
          accommodating non-matched routes (a 404 essentially) and also drop in
          redirects as needed */}
      <Switch>
        <Route exact path="/" component={ViewHome} />
        <Route path="/client" component={Client} />
        <Route path="/maps" component={Maps} />
        <Route path="/resources" component={Resources} />
        <Route path="/gallery" component={Gallery} />
        {/* <Redirect from="/resources" to="/maps" /> */}
        <Route component={NoMatch} /> {/* 404 Route */}
      </Switch>

    </div>
  </Router>
);

const NoMatch = () => (
  <div>
    <h2>404</h2>
  </div>
);

const Client = () => (
  <div>
    <h2>Client</h2>
  </div>
);

const Gallery = () => (
  <div>
    <h2>Gallery</h2>
  </div>
);

/**
 *
 **/
const Resources = ({ match }) => (
  <div>
    <h2>Resources</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:resourceId`} component={Resource} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a resource.</h3>}
    />
  </div>
);

const Resource = ({ match }) => (
  <div>
    <h3>{match.params.resourceId}</h3>
  </div>
);

/**
 *
 **/
const Maps = ({ match }) => (
  <div>
    <h2>Maps</h2>
    <ul>
      <li>
        <Link to={`${match.url}/astaria-proper`}>Astaria Proper</Link>
      </li>
      <li>
        <Link to={`${match.url}/astaria-wilderness`}>Astaria Wilderness</Link>
      </li>
      <li>
        <Link to={`${match.url}/altheon`}>Altheon</Link>
      </li>
      <li>
        <Link to={`${match.url}/sunhillow-rime`}>Sunhillow &amp; The Rimelands</Link>
      </li>
      <li>
        <Link to={`${match.url}/rising-sun`}>Rising Sun (Sakai)</Link>
      </li>
      <li>
        <Link to={`${match.url}/the-wastes`}>The Wastes</Link>
      </li>
      <li>
        <Link to={`${match.url}/nahanet`}>Nahanet</Link>
      </li>
      <li>
        <Link to={`${match.url}/sable`}>Sable (only a legend..)</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:mapId`} component={Map} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a map.</h3>}
    />
  </div>
);

const Map = ({ match }) => (
  <div>
    <h3>{match.params.mapId}</h3>
  </div>
);

/**
 * Export App entry point
 **/
export default App;