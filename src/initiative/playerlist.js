import React, { Component } from 'react';
import { PlayerFrame } from './playerFrame/playerFrame';

export class PlayerList extends Component {
  listBuilder() {
    var playerList = "Fetching ...";
    if (this.props.list != "") {
      playerList = this.props.list.map((player) =>
        <div key={player.name}>
          <PlayerFrame
            player={player}
            onChange={this.props.onChange}
            moveUp={this.props.moveUp}
            moveDown={this.props.moveDown}
            moveDelete={this.props.moveDelete}
            changeTurn={this.props.changeTurn}
            changeHP={this.props.changeHP}
            started={this.props.started}
          />
        </div>
      );
    }
    return playerList;
  }

  render() {
    return (
      <div>{this.listBuilder()}</div>
    )
  }
}

export default PlayerList;