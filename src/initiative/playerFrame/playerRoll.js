import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

class PlayerRoll extends Component {
  state = {
    roll: null
  }

  handleSubmit = (player, event) => {
    if(this.state.roll) {
      event = {
        target:
        {
          value: this.state.roll
        }
      }
      this.props.onChange(player, event)
    }
  }

  handleChange = (event) => this.setState({roll: event.target.value})


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
            onChange={this.handleChange}
            onBlur={() => this.handleSubmit(this.props.player)}
          />
          <InputGroup.Addon style={{ width: "50px" }}>{this.props.player.initiative}</InputGroup.Addon>
        </InputGroup>
      </FormGroup>

    )
  }
}

export default PlayerRoll;