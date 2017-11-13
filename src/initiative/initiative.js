import React, { Component } from 'react';
import { PlayerList } from './playerlist';
import { InputNPC } from './inputNPC';
import '../style.css';
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiative: "",
      name: "",
      playerList: ""
    };
    this.getPlayersArray();
  }

  addNPC(event) {
    event.preventDefault();
    let {initiative, name} = this.state
    if(this.state.initiative == "") {
      initiative = 0;
    }
    if(this.state.name == "") {
      name = "Dummy";
    }

    let newPlayer = this.createPlayer(name, initiative);
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.push(newPlayer);
    this.setState({ playerList: newPlayerList });
  }

  createPlayer(name, init) {
    let newPlayer = {
      buttonStyle: "warning",
      initiative: init,
      name: name,
      success: 0,
      turn: 0
    }
    return newPlayer;
  }

  onChangeName(event) {
    this.setState({ name: event.target.value })
  }

  onChangeInitiative(event) {
    this.setState({ initiative: event.target.value })
  }

  moveUp(player) {
    let newPlayerList = this.state.playerList.slice();
    let index = this.state.playerList.indexOf(player);
    if(index > 0) {
        let tempPlayer = newPlayerList[index - 1];
        newPlayerList[index - 1] = player;
        newPlayerList[index] = tempPlayer;
    }
    this.setState({playerList: newPlayerList});
  }

  moveDown(player) {
    let newPlayerList = this.state.playerList.slice();
    let index = this.state.playerList.indexOf(player);
    if(index < newPlayerList.length - 1) {
        let tempPlayer = newPlayerList[index + 1];
        newPlayerList[index + 1] = player;
        newPlayerList[index] = tempPlayer;
    }
    this.setState({playerList: newPlayerList});
  }

  moveDelete(player) {
    let newPlayerList = this.state.playerList.filter((pl) => pl != player);
    this.setState({playerList: newPlayerList});
  }

  sortPlayer() {
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.sort((p1, p2) => {
      if(p1.success == 1) return -1;
      if(p2.success == 1) return 1;
      if(p2.success == 1 && p1.success == 1) return 0;
      if(p1.success == -1) return 1;
      if(p2.success == -1) return -1;
      if(p2.success == -1 && p1.success == -1) return 0;
      return p2.turn - p1.turn;
    })
    this.setState({ playerList: newPlayerList });
  }

  onChangeRoll(player, event) {
    player.roll = event.target.value;
    player.turn = Number(player.roll) + Number(player.initiative);
    player.buttonStyle = "info";

    this.success(player);
    this.sortPlayer();
  }

  success(player) {
    if(player.roll == 20) {
      player.success = 1;
      player.buttonStyle = "success";
    } else if(player.roll == 1) {
      player.success = -1;
      player.buttonStyle = "danger";
    } else {
      player.success = 0;
      player.buttonStyle = "info";
    }
  }

  getPlayersArray() {
    fetch('/api/players')
      .then(response => response.json())
      .then((json) => {
        let playerList = []
        for (let player of json) {
          playerList.push(player);
        }
        for(let player of playerList) {
          player.turn = 0;
          player.buttonStyle = "warning";
          player.success = 0;
        }
        this.setState({ playerList: playerList });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row row-spacing">
          <div className="col-lg-2"></div>
          <div className="col-lg-6">
            <InputNPC
              submitAction={this.addNPC.bind(this)}
              onChangeName={this.onChangeName.bind(this)}
              onChangeInitiative={this.onChangeInitiative.bind(this)}
            />
          </div>
        </div>
        <PlayerList
          list={this.state.playerList}
          onChange={this.onChangeRoll.bind(this)}
          moveUp={this.moveUp.bind(this)}
          moveDown={this.moveDown.bind(this)}
          moveDelete={this.moveDelete.bind(this)}
        />
      </div>
    )
  }
}

export default Initiative;