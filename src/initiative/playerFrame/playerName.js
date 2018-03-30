import React, { Component } from 'react';
import { Button, Badge, ProgressBar } from 'react-bootstrap';

class playerName extends Component {
  render() {
    return (
      <div>
        <Button
          onClick={() => this.props.changeTurn(this.props.player)}
          bsStyle={this.props.player.isTurn ? "default" : this.props.player.buttonStyle}
          block
        >
          <strong>{this.props.player.name} </strong>
          {
            <Badge>{this.props.player.turn > 0 ? this.props.player.turn : ""}</Badge>
          }
        </Button>
        {this.props.player.isPlayer
          ? <div className="player-row-spacing"></div>
          : (
            <ProgressBar
              style={{
                height: "0.4rem",
                marginBottom: "-0.5rem"
              }}
              className="progress-maring"
              now={this.props.player.percentHP}
              bsStyle={
                (this.props.player.hp >= 0)
                  ? "danger"
                  : "primary"
              }
            />
          )
        }
      </div>
    )
  }
}

export default playerName;