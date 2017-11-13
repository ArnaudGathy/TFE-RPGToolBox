import React from 'react';
import { Button } from 'react-bootstrap';

const PlayerName = (props) => {
    return (
        <Button 
        bsStyle={props.player.buttonStyle}
        block
        >
            <strong>{props.player.name} | {props.player.turn}</strong> 
        </Button>
    )
}
 
export default PlayerName;