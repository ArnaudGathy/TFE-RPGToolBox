import React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

const PlayerRoll = (props) => {
  return (
      <FormGroup>
        <InputGroup>
          <FormControl
            style={{ width: "50px" }}
            type="text"
            placeholder="Roll"
            onChange={(event) => props.onChange(props.player, event)}
          />
          <InputGroup.Addon style={{ width: "50px" }}>{props.player.initiative}</InputGroup.Addon>
        </InputGroup>
      </FormGroup>
  );
}

export default PlayerRoll;