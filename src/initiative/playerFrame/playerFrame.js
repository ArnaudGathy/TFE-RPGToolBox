import React, { Component } from 'react';

import PlayerRoll from './playerRoll';
import PlayerName from './playerName';
import PlayerButtons from './playerButtons';
import PlayerHP from './playerHP';

export class PlayerFrame extends Component {
  render() {
    return (
      <div className="row row-spacing">
        <div className="col-lg-2 text-center">
          <PlayerButtons
            player={this.props.player}
            moveUp={this.props.moveUp}
            moveDown={this.props.moveDown}
            moveDelete={this.props.moveDelete}
          />
        </div>
        <div className="col-lg-3 text-center">
          <PlayerName
            player={this.props.player}
            changeTurn={this.props.changeTurn}
            started={this.props.started}
          />
        </div>
        {!this.props.player.isPlayer && this.props.started &&
          <div className="col-lg-1 text-center">
            <PlayerHP
              player={this.props.player}
              changeHP={this.props.changeHP}
            />
          </div>

        }
        <div className="col-lg-1">
          {
            this.props.started
              ? null
              : <PlayerRoll
                ref={component => {
                  this.playerRoll = component
                }}
                player={this.props.player}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
              />
          }
        </div>
      </div>
    )
  }
}