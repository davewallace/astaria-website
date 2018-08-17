// yaay
import React from "react";

// Routing, as described here: https://reacttraining.com/react-router/web/
// Add 'Rediect' to this chain if it is needed at some point, there's an example
// commented out within the Router block below.
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Imports for user views, or pages if you prefer
import ViewHome from './views/Home'
import ViewURLNotFound from './views/URLNotFound'
import ViewClient from './views/Client'
import ViewGallery from './views/Gallery'
import ViewMaps from './views/Maps'
import ViewResources from './views/Resources'

// For creating a main navigation, and potentially other types of navigation
import UserNavigation from './components/ui/davewallace.io/ui/components/UserNavigation'

// Style
import 'normalize.css';
import './style/App.css';

// Main navigation definition, supplied to abstracted components
const navMain = [
  {
    "name": "Home",
    "path": "/",
    "exact": true,
    "component": ViewHome
  },
  {
    "name": "Play",
    "path": "/client",
    "exact": true,
    "component": ViewClient
  },
  {
    "name": "Maps",
    "path": "/maps",
    "exact": true,
    "component": ViewMaps
  },
  {
    "name": "Resources",
    "path": "/resources",
    "exact": true,
    "component": ViewResources
  },
  {
    "name": "Gallery",
    "path": "/gallery",
    "exact": true,
    "component": ViewGallery
  }
]

function handle_click_unicorn (e) {

  //e.preventDefault();
  console.log('The link was clicked, a unicorn was activated.');
}

// Vroom vroom!
const App = () => (
  <Router>
    <div className="view-container">

      {/* Using a Switch allows us to declare our expected routes, while also
          accommodating non-matched routes (a 404 essentially) and also drop in
          redirects as needed

        <Redirect from="/resources" to="/maps" />

        <Route exact path="/" component={ViewHome} />
        <Route path="/client" component={ViewClient} />
        <Route path="/maps" component={ViewMaps} />
        <Route path="/resources" component={ViewResources} />
        <Route path="/gallery" component={ViewGallery} />

      */}
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

      <UserNavigation
        classNameSuffix="-main"
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

    </div>
  </Router>
)

/**
 * Export App entry point
 **/
export default App
