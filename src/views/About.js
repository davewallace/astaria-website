import React from "react"
import { Link } from "react-router-dom"
import Title from '../components/ui/Title'

const numberOfRaces = '15'
const numberOfGuilds = '9'

const About = () => (

  <div className="view-root view-about">

    <Title level={2}>Once more unto the breach, dear friends...</Title>

    <p>Welcome, traveller, to the portal of Astaria, one of the internet's oldest multiplayer online games - a simple and yet creatively deep <abbr title="Multi User Dungeon">MUD</abbr>.</p>
    <p>Let your spirit take shape in one of { numberOfRaces } races, cast your will into one of { numberOfGuilds } guilds and begin your journey towards destiny.</p>
    <p>Forge friendships, gain power, work with allies and vanquish foes...</p>

    <Link to="/play">
      Venture into the realm of Astaria today
    </Link>

  </div>
);

export default About;
