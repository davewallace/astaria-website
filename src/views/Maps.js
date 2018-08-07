import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

const Maps = ({ match }) => (

  <div className="view-root">

    <h1>The Astarian Cartographic Society</h1>

    <p>Mala, co-founder of Astaria's Cartographic Society has comissioned the gathering of as many maps as possible. After much debate, many broken pencils and resulting re-exploration parties - the wizened (and strangely blind) old man has released a series of maps which may be considered as 'Official';</p>

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

export default Maps;
