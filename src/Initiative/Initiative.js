import React, { Component } from 'react';
import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import '../style.css';

import PlayerService from '../PlayerService'; // Liste de joueurs temporaire

const Initiative = () => (
  <div className="container">
    <div className="row row-spacing">
      <div className="col-lg-3"></div>
      <div className="col-lg-3 text-center">New Player Input{/*TODO*/}</div>
      <div className="col-lg-6"></div>
    </div>
    <PlayerList />
  </div>
)

function PlayerList() {
  const players = new PlayerService().players;
  var playerList = players.map((player) =>
    <div>
      <PlayerFrame name={player.name} />
    </div>
  );

  return (
    <div>{playerList}</div>
  )
}

const PlayerFrame = (props) => (
  <div className="row row-spacing">
    <div className="col-lg-3"></div>
    <div className="col-lg-3"><Button bsStyle="primary">{props.name}</Button></div>
    <div className="col-lg-2 text-center">+stat {/*TODO*/}</div>
    <div className="col-lg-1 text-center">buttons{/*TODO*/}</div>
    <div className="col-lg-3"></div>
  </div>
)

export default Initiative;