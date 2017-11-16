import React from 'react';
import { Button, Badge, ProgressBar } from 'react-bootstrap';

const PlayerName = (props) => {
    return (
        <div>
            <Button
                onClick={() => props.changeTurn(props.player)}
                bsStyle={props.player.isTurn 
                    ? "default" 
                    : props.player.buttonStyle}
                block
            >
                <strong>{props.player.name} </strong>
                {
                    props.started 
                    ? null 
                    : <Badge>{props.player.turn}</Badge>
                }
            </Button>
            <ProgressBar
                style={{ height: "7px" }}
                className="progress-maring"
                now={props.player.percentHP}
                bsStyle={
                    (props.player.hp >= 0) 
                    ? "danger" 
                    : "info"
                    }
            />
        </div>
    )
}

export default PlayerName;