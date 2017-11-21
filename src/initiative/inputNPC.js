import React, { Component } from 'react';
import { FormControl, Glyphicon, InputGroup, Button } from 'react-bootstrap';
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

  onChangeHP(event) {
    this.setState({ hp: event.target.value })
  }

  createPlayer(event) {
    if(event.key === "Enter" || event.type === "click") {
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
  }

  render() {
    return (
      <div className="row row-spacing input-spacing">
        <div className="col-lg-2 text-center">
          <Button
            bsStyle="success"
            onClick={this.createPlayer.bind(this)}>
            <Glyphicon glyph="plus" /> Add
          </Button>
        </div>
        <div className="col-lg-3">
          <InputGroup>
            <FormControl
              style={{ width: "223px" }}
              type="text"
              placeholder="NPC Name"
              onChange={this.onChangeName.bind(this)}
              onKeyPress={this.createPlayer.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="user" />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="col-lg-1 text-center">
          <InputGroup>
            <FormControl
              style={{ width: "50px" }}
              type="text"
              placeholder="HP"
              onChange={this.onChangeHP.bind(this)}
              onKeyPress={this.createPlayer.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="heart" />
            </InputGroup.Addon>
          </InputGroup>
        </div>
        <div className="col-lg-1">
          <InputGroup>
            <FormControl
              style={{ width: "50px" }}
              type="text"
              placeholder="INIT"
              onChange={this.onChangeInitiative.bind(this)}
              onKeyPress={this.createPlayer.bind(this)}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="stats" />
            </InputGroup.Addon>
          </InputGroup>
        </div>
      </div>
    )
  }
}

export default InputNPC;