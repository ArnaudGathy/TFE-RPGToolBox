import React from 'react';
import { Button, FormControl, Form, FormGroup } from 'react-bootstrap';
import '../style.css';

export const InputNPC = (props) => {
  return (
    <Form inline
      onSubmit={props.submitAction}
    >
      <FormGroup>
        <FormControl
          style={{ width: "200px" }}
          type="text"
          placeholder="NPC Name"
          onChange={props.onChangeName}
        />
        {' '}
        <FormControl
          style={{ width: "50px" }}
          type="text"
          placeholder="Init"
          onChange={props.onChangeInitiative}
        />
        {' '}
        <Button type="submit">
          Add
          </Button>
      </FormGroup>
    </Form>
  )
}

export default InputNPC;