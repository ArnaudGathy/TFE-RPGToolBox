import React, { Component } from 'react';
import { Button, FormControl, Form, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';
import '../style.css';

export class InputNPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: "",
      initiative: "",
      name: ""
    }
  }

  onChangeName(event) {
    this.setState({ name: event.target.value })
  }

  onChangeInitiative(event) {
    this.setState({ initiative: event.target.value })
  }

  createPlayer(event) {
    event.preventDefault();
    let { initiative, name, hp } = this.state
    if (this.state.initiative === "") {
      initiative = 0;
    }
    if (this.state.name === "") {
      name = "Dummy";
    }
    if (this.state.hp === "") {
      hp = 10;
    }
    let newPlayer = {
      buttonStyle: "warning",
      hp: hp,
      initiative: initiative,
      isTurn: false,
      maxHP: hp,
      name: name,
      percentHP: 100,
      success: 0,
      turn: 0
    }
    this.props.onSubmit(newPlayer);
  }

  render() {
    return (
      <Form
        inline
        onSubmit={this.createPlayer.bind(this)}
      >
        <FormGroup>
          <InputGroup>
            <FormControl
              style={{ width: "160px" }}
              type="text"
              placeholder="NPC Name"
              onChange={this.onChangeName.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="user" />
            </InputGroup.Addon>
          </InputGroup>
          {' '}
          <InputGroup>
            <FormControl
              style={{ width: "55px" }}
              type="text"
              placeholder="INIT"
              onChange={this.onChangeInitiative.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="stats" />
            </InputGroup.Addon>
          </InputGroup>
          {' '}
          <InputGroup>
            <FormControl
              style={{ width: "50px" }}
              type="text"
              placeholder="HP"
              onChange={this.onChangeInitiative.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="heart" />
            </InputGroup.Addon>
          </InputGroup>
          {' '}
          <Button
            type="submit"
            bsStyle="success">
            <Glyphicon glyph="plus" />
          </Button>
        </FormGroup>
      </Form>
    )
  }
}

export default InputNPC;