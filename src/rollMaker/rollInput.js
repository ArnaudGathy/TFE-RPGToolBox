import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

export class RollInput extends Component {
    state = {}

    render() {
        return (
            <div>
                {this.props.player.name}
                <FormControl
                    style={{ width: "50px" }}
                    type="text"
                    placeholder="Roll"
                />
            </div>
        )
    }
}

export default RollInput;