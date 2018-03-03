import React, { Component } from 'react';
import { PlayerFrame } from './playerFrame/playerFrame';

export class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFocus: 0
    };
  }

  componentDidMount() {
    this.listBuilder();
  }

  listBuilder() {
    this.playerFrame = [];
    let playerList = [];
    this.props.list.map((player) => {
      playerList.push(
        <PlayerFrame
          key={player.id}
          ref={component => {
            if(component !== null) this.playerFrame.push(component);
          }}
          player={player}
          onChange={this.props.onChange}
          moveUp={this.props.moveUp}
          moveDown={this.props.moveDown}
          moveDelete={this.props.moveDelete}
          changeTurn={this.props.changeTurn}
          changeHP={this.props.changeHP}
          started={this.props.started}
        />
        );
      return playerList;
    });
    return playerList;
  }

  render() {
    return (
      <div>{this.listBuilder()}</div>
    )
  }
}

export default PlayerList;