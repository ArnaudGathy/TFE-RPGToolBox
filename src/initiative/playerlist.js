import React, { Component } from 'react';
import {PlayerFrame} from './playerFrame';

export class PlayerList extends Component {
    listBuilder() {
        var playerList = "Fetching ...";
        if (this.props.list != "") {
          playerList = this.props.list.map((player) =>
            <div key={player.nom}>
              <PlayerFrame 
                player={player}
                onChange={this.props.onChange}
              />
            </div>
          );
        }
        return playerList;
    }

    render() { 
        return ( 
            <div>{this.listBuilder()}</div>
         )
    }
}
 
export default PlayerList;