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

  onKeyPress(event) {
    if (event.key === "Enter") {
      let newCurrentFocus = this.state.currentFocus + 1;
      if(newCurrentFocus > this.playerFrame.length - 1) {
        newCurrentFocus = 0;
      }
      this.playerFrame[newCurrentFocus].playerRoll.input.focus()
      this.setState({currentFocus: newCurrentFocus});
    }
  }

  listBuilder() {
    this.playerFrame = [];
    let playerList = [];
    this.props.list.map((player, index) => {
      playerList.push(
        <PlayerFrame
          key={index}
          ref={component => {
            if(component !== null) this.playerFrame.push(component);
          }}
          player={player}
          onChange={this.props.onChange}
          onKeyPress={this.onKeyPress.bind(this)}
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