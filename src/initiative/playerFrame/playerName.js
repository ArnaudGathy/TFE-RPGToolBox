import React from 'react';
import { Button, Badge, ProgressBar } from 'react-bootstrap';

const PlayerName = (props) => {
  return (
    <div>
      <Button
        onClick={() => props.changeTurn(props.player)}
        bsStyle={props.player.isTurn ? "default" : props.player.buttonStyle}
        block
      >
        <strong>{props.player.name} </strong>
        {
          <Badge>{props.started ? (props.player.duration > 0 ? props.player.duration : "") : (props.player.turn > 0 ? props.player.turn : "")}</Badge>
        }
      </Button>
      {props.player.isPlayer
        ? <div className="player-row-spacing"></div>
        : (
          <ProgressBar
            style={{
              height: "0.4rem",
              marginBottom: "-0.5rem"
            }}
            className="progress-maring"
            now={props.player.percentHP}
            bsStyle={
              (props.player.hp >= 0)
                ? "danger"
                : "primary"
            }
          />
        )
      }
    </div>
  )
}

export default PlayerName;