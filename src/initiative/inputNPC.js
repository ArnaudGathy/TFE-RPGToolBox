import React, { Component } from 'react';
import { FormControl, Glyphicon, InputGroup, Button } from 'react-bootstrap';
import '../style.css';

export class InputNPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: "",
      initiative: "",
      name: "",
      isRandom: true
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

  toggleRandom = () => {
    this.setState({ isRandom: !this.state.isRandom})

  }
  createPlayer(event) {
    if(event.key === "Enter" || event.type === "click") {
      let { initiative, name, hp } = this.state

      if(!name) {
        name = 'Dummy';
      }

      while(this.props.isNameUsed(name)) {
        if((/\d/).test(name)) {
          let number = Number(name.replace(/^\D+/g, '')) + 1;
          let nameString = name.replace(/[0-9]/g, '');
          name = `${nameString} ${number}`;
        } else {
          name = `${name} 2`;
        }
      }
        
      let newPlayer = {
        id: this.props.lastID() + 1,
        buttonStyle: "warning",
        hp: hp || 10,
        initiative: initiative || 0,
        isTurn: false,
        maxHP: hp || 10,
        name: name,
        percentHP: 100,
        success: 0,
        turn: 0,
        isPlayer: false
      }
      this.props.onSubmit(newPlayer, this.state.isRandom);
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
          <Button
            bsStyle="default"
            active={this.state.isRandom}
            onClick={this.toggleRandom}
            style={{ margin: "0 0 0 1rem"} }
          >
            <Glyphicon glyph="random" />
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
        <div className="col-lg-1">
        </div>
      </div>
    )
  }
}

export default InputNPC;