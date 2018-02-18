import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { choosePlayer, getPlayers, sendRoll } from '../socket/api';
import PlayerList from '../rollMaker/playerList';
import RollInput from '../rollMaker/rollInput';



export class RollMaker extends Component {
  state = {
    player: "",
    playerList: []
  };

  componentDidMount() {
    getPlayers(list => {
      this.setState({ playerList: list }, () => {
        if (this.state.playerList.length === 0)
          this.setState({ player: "" })
      })
    });
  }

  choosePlayer(player) {
    this.setState({ player: player });
    choosePlayer(player);
  }

  submitRoll(roll, event) {
    event.preventDefault();
    sendRoll(roll);
  }

  renderPlayers() {
    return this.state.playerList.map((player) => {
      return (
        <ListGroupItem
          key={player.id}
          onClick={() => this.choosePlayer(player)}
          bsStyle="info"
        >
          {player.name}
        </ListGroupItem>
      )
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {
            this.state.player !== ""
              ? <RollInput
                isWaiting={this.state.playerList.length === 0}
                player={this.state.player}
                submitRoll={this.submitRoll.bind(this)}
              />
              : <PlayerList
                isWaiting={this.state.playerList.length === 0}
                render={this.renderPlayers.bind(this)}
              />
          }
        </div>
      </div>
    )
  }
}

export default RollMaker;