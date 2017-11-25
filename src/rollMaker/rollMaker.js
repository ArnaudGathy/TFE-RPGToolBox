import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { choosePlayer, getPlayers, isPlayerSelected } from '../socket/api';
import PlayerList from '../rollMaker/playerList';
import RollInput from '../rollMaker/rollInput';



export class RollMaker extends Component {
    state = {
        player: "",
        playerList: []
    };

    componentDidMount() {
        getPlayers(list => this.setState({ playerList: list }));
    }

    choosePlayer(player) {
        this.setState({ player: player });
        choosePlayer(player);
    }

    submitRoll(roll) {
        window.alert(roll);
    }

    renderPlayers() {
        return this.state.playerList.map((player, index) => {
            return (
                <li key={index} className="li-spacing">
                    <Button
                        onClick={() => this.choosePlayer(player)}
                        bsStyle="primary">
                        {player.name}
                    </Button>
                </li>
            )
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.player != ""
                        ? <RollInput 
                            player={this.state.player}
                            submitRoll={this.submitRoll.bind(this)}
                            />
                        : <PlayerList 
                            isWaiting={this.state.playerList.length == 0}
                            render={this.renderPlayers.bind(this)}
                            />
                }
            </div>
        )
    }
}

export default RollMaker;