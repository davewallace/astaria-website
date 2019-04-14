import React from "react"
import { Link } from "react-router-dom"

const numberOfRaces = '15'
const numberOfGuilds = '9'

const About = () => (

  <div className="view-root view-about">

    <h2>Once more unto the breach, dear friends...</h2>

    <p>Welcome, traveller, to the portal of Astaria, one of the internet's oldest multiplayer online games - a simple and yet creatively deep <abbr title="Multi User Dungeon">MUD</abbr>.</p>
    <p>Let your spirit take shape in one of { numberOfRaces } races, cast your will into one of { numberOfGuilds } guilds and begin your journey towards destiny.</p>
    <p>Forge friendships, gain power, work with allies and vanquish foes...</p>

    <Link to="/play">
      Venture into the realm of Astaria today
    </Link>

  </div>
);

export default About;
