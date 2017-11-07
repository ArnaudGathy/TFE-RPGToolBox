import React, { Component } from 'react';

import { Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import '../style.css';

import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: "test"
    };
    this.getPlayerList();
  }

  getPlayerList() {
    fetch('/api/players')
    .then(response => response.json())
    .then((json) => {
      let playerList = []
      for(let player of json) {
        playerList.push(player);
      }
      this.setState({playerList: playerList});
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row row-spacing">
          <div className="col-lg-3"></div>
          <div className="col-lg-3 text-center">New Player Input{/*TODO*/}</div>
          <div className="col-lg-6"></div>
        </div>
        <PlayerList list={this.state.playerList} /> 
      </div>
    )
  }
}

function PlayerList(props) {
  var playerList = "Fetching ...";
  if(props.list != "test") {
    playerList = props.list.map((player) =>
      <div>
        <PlayerFrame name={player.nom} />
      </div>
    );
  }

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