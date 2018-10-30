import React from "react";
import Title from '../components/ui/Title'

const Play = () => (

  <div className="view-root view-play">
    <Title level={2}>Play</Title>
    <iframe className="webclient-container" title="Astaria web client connection window." src="http://astaria.net/wm_client/webclient.php" />
  </div>
);

export default Play;
