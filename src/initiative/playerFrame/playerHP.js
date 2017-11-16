import React from 'react';
import { FormControl, Form, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';

const PlayerHP = (props) => {
  return (
    <Form>
      <FormGroup>
        <InputGroup>
          <FormControl
            style={{ width: "50px" }}
            type="text"
            placeholder="HP"
            value={props.player.hp}
            onChange={(event) => props.changeHP(event, props.player)}
          />
          <InputGroup.Addon
          style={{ width: "30px" }}
          >
            <Glyphicon glyph="heart" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    </Form>
  )
}

export default PlayerHP;