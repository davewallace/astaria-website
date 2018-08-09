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
import UserNavigation from './components/davewallace.io/ui/components/UserNavigation'

// Style
import 'normalize.css';
import './style/App.css';

const App = () => (
  <Router>
    <div className="view-container">

      {/* Using a Switch allows us to declare our expected routes, while also
          accommodating non-matched routes (a 404 essentially) and also drop in
          redirects as needed */}
      <Switch>
        <Route exact path="/" component={ViewHome} />
        <Route path="/client" component={ViewClient} />
        <Route path="/maps" component={ViewMaps} />
        <Route path="/resources" component={ViewResources} />
        <Route path="/gallery" component={ViewGallery} />
        {/* <Redirect from="/resources" to="/maps" /> */}
        <Route component={ViewURLNotFound} /> {/* 404 Route */}
      </Switch>

      <UserNavigation test="hihi" />

    </div>
  </Router>
);

/**
 * Export App entry point
 **/
export default App;