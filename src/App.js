// yaay
import React from "react";

// Routing, as described here: https://reacttraining.com/react-router/web/
// Add 'Rediect' to this chain if it is needed at some point, there's an example
// commented out within the Router block below.
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Imports for user views, or pages if you prefer
import ViewAbout from './views/About'
import ViewURLNotFound from './views/URLNotFound'
import ViewPlay from './views/Play'
import ViewResources from './views/Resources'

// bespoke logic
import Unicorn from './components/bespoke/Unicorn'
import WorldMap from './components/bespoke/WorldMap'

// UI components
import UserNavigation from './components/ui/UserNavigation'

import logo from './images/logo-black-astaria.png'

// Style
import 'normalize.css';
import './style/App.css';

// Main navigation definition, supplied to abstracted components
const navMain = [
  {
    "name": "About",
    "path": "/",
    "exact": true,
    "component": ViewAbout
  },
  {
    "name": "Play",
    "path": "/play",
    "exact": true,
    "component": ViewPlay
  },
  {
    "name": "Resources",
    "path": "/resources",
    "exact": true,
    "component": ViewResources
  }
]

function handle_click_unicorn (e) {

  //e.preventDefault();
  console.log('The link was clicked, a unicorn was activated.');
}

// Vroom vroom!
const App = () => (
  <Router>

    <div className="app-container">

      <h1 class="title-main">
        <img src={logo} alt="Astaria" />
      </h1>

      <Unicorn />

      {/* start main nav area */}
      <UserNavigation
        customRootClassNameSuffix="main"
        currentItem=""
        list={
          navMain.map(function (item) {
            return {
              "to": item.path,
              "name": item.name,
              "onClick": handle_click_unicorn
            }
          })
        }
      />

      <WorldMap />

      {/* end main nav area */}

      {/* start content area */}
      {/* Using a Switch allows us to declare our expected routes, while also
          accommodating non-matched routes (a 404 essentially) and also drop in
          redirects as needed

        <Redirect from="/resources" to="/maps" />

        <Route exact path="/" component={ViewAbout} />
        <Route path="/client" component={ViewPlay} />
        <Route path="/resources" component={ViewResources} />

      */}
      {/* TODO: comment on what a Switch achieves */}
      <Switch>
        {
          navMain.map(function (item, i) {
            return <Route exact={item.exact}
                          path={item.path}
                          component={item.component}
                          key={i} />
          })
        }
        {/* 404 Route */}
        <Route component={ViewURLNotFound} />
      </Switch>
    </div>
    {/* end content area */}

  </Router>
)

/**
 * Export App entry point
 **/
export default App
