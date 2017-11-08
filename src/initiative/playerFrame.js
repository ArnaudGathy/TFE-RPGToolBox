import React from 'react';
import { Button } from 'react-bootstrap';
import PlayerRoll from './playerRoll';

export const PlayerFrame = (props) => (
    <div className="row row-spacing">
        <div className="col-lg-3"></div>
        <div className="col-lg-3">
            <Button bsStyle="primary">
                {props.player.nom} - {props.player.roll}
            </Button>
        </div>
        <div className="col-lg-2 text-center">
            <PlayerRoll 
            player={props.player} 
            onChange={props.onChange} 
            />
        </div>
        <div className="col-lg-1 text-center">buttons{/*TODO*/}</div>
        <div className="col-lg-3"></div>
    </div>
)