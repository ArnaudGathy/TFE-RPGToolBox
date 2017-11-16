import React from 'react';

import PlayerRoll from './playerRoll';
import PlayerName from './playerName';
import PlayerButtons from './playerButtons';
import PlayerHP from './playerHP';

export const PlayerFrame = (props) => (
  <div className="row row-spacing">
    <div className="col-lg-2 text-center">
      <PlayerButtons
        player={props.player}
        moveUp={props.moveUp}
        moveDown={props.moveDown}
        moveDelete={props.moveDelete}
      />
    </div>
    <div className="col-lg-3 text-center">
      <PlayerName
        player={props.player}
        changeTurn={props.changeTurn}
        started={props.started}
      />
    </div>
    <div className="col-lg-1 text-center">
      <PlayerHP
        player={props.player}
        changeHP={props.changeHP}
      />
    </div>
    <div className="col-lg-1">
      {
        props.started
          ? null
          : <PlayerRoll
            player={props.player}
            onChange={props.onChange}
          />
      }
    </div>
  </div>
)