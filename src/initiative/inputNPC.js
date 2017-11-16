import React, { Component } from 'react';
import { Button, FormControl, Form, FormGroup, Glyphicon, InputGroup } from 'react-bootstrap';
import '../style.css';

export class InputNPC extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    let { initiative, name } = this.state
    if (this.state.initiative === "") {
      initiative = 0;
    }
    if (this.state.name === "") {
      name = "Dummy";
    }
    let newPlayer = {
      buttonStyle: "warning",
      initiative: initiative,
      isTurn: true,
      name: name,
      success: 0,
      turn: 0

    }
    this.props.onSubmit(newPlayer);
  }

  render() {
    return (
      <div className="row row-spacing">
        <div className="col-lg-2"></div>
        <div className="col-lg-6">
          <Form
            inline
            onSubmit={this.createPlayer.bind(this)}
          >
            <FormGroup>
              <FormControl
                style={{ width: "160px" }}
                type="text"
                placeholder="NPC Name"
                onChange={this.onChangeName.bind(this)}
              />
              {' '}
              <InputGroup>

                <FormControl
                  style={{ width: "60px" }}
                  type="text"
                  placeholder="INIT."
                  onChange={this.onChangeInitiative.bind(this)}
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
        </div>
      </div>
    )
  }
}

export default InputNPC;