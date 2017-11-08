import React, { Component } from 'react';
import {PlayerList} from './playerlist';
import {InputNPC} from './inputNPC';
import '../style.css';
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiative: "",
      name: "zizi",
      playerList: ""
    };
    this.getPlayersArray();
  }

  addNPC(event) {
    event.preventDefault();
    let newNPC = {
      initiative: this.state.initiative,
      nom: this.state.name
    }
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.push(newNPC);
    this.setState({playerList: newPlayerList});
  }

  onChangeName(event) {
    this.setState({name: event.target.value})
  }

  onChangeInitiative(event) {
    this.setState({initiative: event.target.value})
  }

  getPlayersArray() {
    fetch('/api/players')
      .then(response => response.json())
      .then((json) => {
        let playerList = []
        for (let player of json) {
          playerList.push(player);
        }
        this.setState({ playerList: playerList });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row row-spacing">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <InputNPC 
              submitAction={this.addNPC.bind(this)}
              onChangeName={this.onChangeName.bind(this)}
              onChangeInitiative={this.onChangeInitiative.bind(this)}
            />
          </div>
        </div>
        <PlayerList list={this.state.playerList} />
      </div>
    )
  }
}

export default Initiative;