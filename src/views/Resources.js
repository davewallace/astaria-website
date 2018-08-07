import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

/**
 *
 **/
const Resources = ({ match }) => (

  <div className="view-root">
    <h2>Resources</h2>
    <ul>
      <li>
        <Link to={`${match.url}/resource`}>Resources Sub-menu item 1</Link>
      </li>
      <li>
        <Link to={`${match.url}/resource`}>Resources Sub-menu item 1</Link>
      </li>
      <li>
        <Link to={`${match.url}/resource`}>Resources Sub-menu item 1</Link>
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

export default Resources;
