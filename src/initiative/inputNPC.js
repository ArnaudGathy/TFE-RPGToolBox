import React from 'react';
import { Button, FormControl, Form, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';
import '../style.css';

export const InputNPC = (props) => {
  return (
    <Form 
    inline 
    onSubmit={props.submitAction}
    >
      <FormGroup>
        <FormControl
        style={{ width: "60px" }}
        type="text"
        placeholder="INIT."
        onChange={props.onChangeInitiative} 
        />
        {' '}
        <InputGroup>
          <FormControl
          style={{ width: "160px" }}
          type="text"
          placeholder="NPC Name"
          onChange={props.onChangeName} 
          />
          <InputGroup.Button>
            <Button 
            type="submit"
            bsStyle="success">
              <Glyphicon glyph="plus" />
            </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </Form>
  )
}

export default InputNPC;