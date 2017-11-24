import React, { Component } from 'react';
import { PlayerList } from './playerlist';
import { InputNPC } from './inputNPC';
import ActionBar from './actionBar';
import { TurnManager } from './turnManager';
import { sendPlayerList, stopRolls } from '../socket/api';
import '../style.css';


export class Inititiative extends Component {
  
  state = {
    extraRound: false,
    newPlayer: "",
    playerList: "",
    playerTurn: "",
    isPromptStarted: false,
    started: false,
    turnCounter: "1",
    turnOrder: "0"
  };

  componentWillMount() {
    this.getPlayersArray();
  }

  getPlayersArray() {
    fetch('/api/players')
      .then(response => response.json())
      .then((json) => {
        let playerList = []
        for (let player of json) {
          playerList.push(player);
        }
        for (let player of playerList) {
          player.turn = 0;
          player.buttonStyle = "warning";
          player.success = 0;
          player.percentHP = 100;
          player.hp = player.maxHP;
        }
        this.setState({ playerList: playerList });
      });
  }

  addNPC(player) {
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.push(player);
    this.setState({ playerList: newPlayerList });
  }

  moveUp(player) {
    let newPlayerList = this.state.playerList.slice();
    let index = this.state.playerList.indexOf(player);
    if (index > 0) {
      let tempPlayer = newPlayerList[index - 1];
      newPlayerList[index - 1] = player;
      newPlayerList[index] = tempPlayer;
    }
    this.setState({ playerList: newPlayerList }, () => this.moveUpTurn(player));
  }

  moveUpTurn(player) {
    if (player.isTurn) {
      let turn = this.checkNextTurn(this.state.turnOrder);
      this.setTurns(turn);
    }
  }

  moveDown(player) {
    let newPlayerList = this.state.playerList.slice();
    let index = this.state.playerList.indexOf(player);
    if (index < newPlayerList.length - 1) {
      let tempPlayer = newPlayerList[index + 1];
      newPlayerList[index + 1] = player;
      newPlayerList[index] = tempPlayer;
    }
    this.setState({ playerList: newPlayerList }, () => this.moveDownTurn(player));

  }

  moveDownTurn(player) {
    if (player.isTurn) {
      let turn = this.checkPrevTurn(this.state.turnOrder);
      this.setTurns(turn);
    }
  }

  moveDelete(player) {
    let newPlayerList = this.state.playerList.filter((pl) => pl !== player);
    this.setState({ playerList: newPlayerList }, () => this.moveDeleteTurn(player));
  }

  moveDeleteTurn(player) {
    if (player.isTurn) {
      let turn = this.state.turnOrder;
      // eslint-disable-next-line
      if (turn == this.state.playerList.length) {
        turn -= 1;
      }
      this.setTurns(turn);
    }
  }

  sortPlayer() {
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.sort((p1, p2) => {
      if (p1.success === 1) return -1;
      if (p2.success === 1) return 1;
      if (p2.success === 1 && p1.success === 1) return 0;
      if (p1.success === -1) return 1;
      if (p2.success === -1) return -1;
      if (p2.success === -1 && p1.success === -1) return 0;
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
    // eslint-disable-next-line
    if(player.success == 1 && player.roll != 20) {
      this.setState({extraRound: false});
    }
    // eslint-disable-next-line
    if (player.roll == 20) {
      player.success = 1;
      player.buttonStyle = "success";
      this.setState({extraRound: true});
    // eslint-disable-next-line
    } else if (player.roll == 1) {
      player.success = -1;
      player.buttonStyle = "danger";
    } else {
      player.success = 0;
      player.buttonStyle = "info";
    }
  }

  changeTurn(player) {
    player.isTurn = true;
    let index = this.state.playerList.indexOf(player);
    let newPlayerList = this.state.playerList.filter((pl) => pl !== player);
    newPlayerList.map((pl) => pl.isTurn = false);
    newPlayerList.splice(index, 0, player);
    this.setState({ playerTurn: player})
    this.setState({ turnOrder: index });
    this.setState({ playerList: newPlayerList });
  }

  setTurns(turn) {
    let [playerTurn] = this.state.playerList.slice().splice(turn, 1);
    playerTurn.isTurn = true;

    let players = this.state.playerList.filter((pl) => pl !== playerTurn);
    players.map((pl) => pl.isTurn = false);
    players.splice(turn, 0, playerTurn);

    this.setState({ playerTurn: playerTurn})
    this.setState({ playerList: players });
    this.setState({ turnOrder: turn });
  }

  start() {
    this.setTurns(0);
    this.setState({ started: true });
    if(this.state.extraRound) {
      this.setState({turnCounter: 0});
    }
  }

  stop() {
    let newPlayerList = this.state.playerList.slice();
    newPlayerList.map((pl) => pl.isTurn = false);
    this.setState({ playerList: newPlayerList });
    this.setState({ started: false });
    this.setState({ turnCounter: 1});
  }

  checkPrevTurn(turn) {
    let newTurn = turn;
    if (turn < 0) {
      newTurn = this.state.playerList.length - 1;
      this.setState({ turnCounter: Number(this.state.turnCounter) - 1});
    }
    return newTurn;
  }

  previous() {
    let turn = this.checkPrevTurn(this.state.turnOrder - 1);
    this.setTurns(turn);
  }

  checkNextTurn(turn) {
    let newTurn = turn;
    if (turn > this.state.playerList.length - 1) {
      newTurn = 0;
      this.setState({ turnCounter: Number(this.state.turnCounter) + 1});
    }
    return newTurn;
  }

  next() {
    let turn = this.checkNextTurn(this.state.turnOrder + 1);
    this.setTurns(turn);
  }

  changeHP(event, player) {
    event.preventDefault();
    let newHP = event.target.value;
    if (Number(newHP) > Number(player.maxHP)) {
      newHP = player.maxHP;
    }
    player.hp = newHP;
    player.percentHP = this.percentHP(player);
    let newPlayerList = this.state.playerList.slice().filter((pl) => pl !== player);
    newPlayerList.push(player);
    this.sortPlayer();
  }

  percentHP(player) {
    let percentHP = 0;
    if (Number(player.hp) >= 0) {
      percentHP = Math.round((Number(player.hp) / Number(player.maxHP)) * 100);
    } else {
      percentHP = 100 - Math.abs(Math.round(Number(player.hp) / Number(player.conStat) * 100));
    }
    return percentHP;
  }

  extraRound() {
    this.setState({ extraRound: !this.state.extraRound});
  }

  isExtraRound() {
    return this.state.extraRound;
  }

  promptRoll() {
    sendPlayerList(this.state.playerList);
    this.setState({isPromptStarted: true});
  }

  stopPromptRoll() {
    stopRolls();
    this.setState({isPromptStarted: false});
  }

  render() {
    return (
      <div className="container">
        {
          this.state.started
            ? <TurnManager 
              playerTurn={this.state.playerTurn}
              turnCounter={this.state.turnCounter}
            />
            : <InputNPC
              onSubmit={this.addNPC.bind(this)}
              started={this.state.started}
            />
        }
        
        {
          // eslint-disable-next-line
          this.state.playerList != ""
          ?
          <PlayerList
            list={this.state.playerList}
            onChange={this.onChangeRoll.bind(this)}
            moveUp={this.moveUp.bind(this)}
            moveDown={this.moveDown.bind(this)}
            moveDelete={this.moveDelete.bind(this)}
            changeTurn={this.changeTurn.bind(this)}
            changeHP={this.changeHP.bind(this)}
            started={this.state.started}
          />
          : "Fetching ..."
        }

        <ActionBar
          start={this.start.bind(this)}
          stop={this.stop.bind(this)}
          previous={this.previous.bind(this)}
          next={this.next.bind(this)}
          started={this.state.started}
          extra={this.extraRound.bind(this)}
          isExtra={this.isExtraRound.bind(this)}
          promptRoll={this.promptRoll.bind(this)}
          stopPromptRoll={this.stopPromptRoll.bind(this)}
          isPromptStarted={this.state.isPromptStarted}
        />
      </div>
    )
  }
}

export default Inititiative;