import React, { Component } from 'react';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';

export class RollInput extends Component {
    state = {
        roll: ""
    };

    onChangeRoll(event) {
        this.setState({ roll: event.target.value});
    }

    onKeyPress(event) {
        if(event.key === "Enter") {
            this.props.submitRoll(this.state.roll);
        }
    }

    render() {
        return (
            <div>
                {this.props.player.name}
                <FormControl
                    style={{ width: "50px" }}
                    type="text"
                    placeholder="Roll"
                    onChange={this.onChangeRoll.bind(this)}
                    onKeyPress={this.onKeyPress.bind(this)}
                />
                <Button 
                bsStyle="success"
                onClick={() => this.props.submitRoll(this.state.roll)}
                >
                    <Glyphicon glyph="ok" />
                </Button>
            </div>
        )
    }
}

export default RollInput;