import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

class PlayerRoll extends Component {
  render() {
    return (
      <FormGroup>
        <InputGroup>
          <FormControl
            inputRef={ref => {
              this.input = ref;
            }}
            style={{ width: "50px" }}
            type="text"
            placeholder="Roll"
            onChange={(event) => this.props.onChange(this.props.player, event)}
            onKeyPress={this.props.onKeyPress}
          />
          <InputGroup.Addon style={{ width: "50px" }}>{this.props.player.initiative}</InputGroup.Addon>
        </InputGroup>
      </FormGroup>

    )
  }
}
export default PlayerRoll;