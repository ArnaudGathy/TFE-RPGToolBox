import React from 'react';

import PlayerRoll from './playerRoll';
import PlayerName from './playerName';
import PlayerButtons from './playerButtons';

export const PlayerFrame = (props) => (
  <div className="row row-spacing">
    <div className="col-lg-2"></div>
    <div className="col-lg-3">
      <PlayerName
        player={props.player}
        changeTurn={props.changeTurn}
      />
    </div>
    <div className="col-lg-2 text-center">
      <PlayerRoll
        player={props.player}
        onChange={props.onChange}
      />
    </div>
    <div className="col-lg-2 text-center">
      <PlayerButtons
        player={props.player}
        moveUp={props.moveUp}
        moveDown={props.moveDown}
        moveDelete={props.moveDelete}
      />
    </div>
  </div>
)