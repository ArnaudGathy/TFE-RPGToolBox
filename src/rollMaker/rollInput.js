import React, { Component } from 'react';
import { Button, FormControl, Glyphicon, PageHeader, FormGroup, InputGroup, Alert } from 'react-bootstrap';

export class RollInput extends Component {
  state = {
    roll: "",
    sent: false
  };

  onChangeRoll(event) {
    this.setState({ roll: event.target.value });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.submitRoll(this.state.roll);
    }
  }

  isValidation = () => 
    (!isNaN(this.state.roll) &&
    Number.isInteger(Number(this.state.roll)) &&
    this.state.roll !== "" &&
    this.state.roll >= 1 &&
    this.state.roll <= 20 &&
    !this.state.sent);

  sendRoll = (event, random = false) => {
    let roll = "";
    if(random) {
      roll = `${Math.floor((Math.random() * 20) + 1)}`;
    } else {
      roll = this.state.roll;
    }
    this.props.submitRoll(roll, event)
    this.setState({roll: roll}, this.setState({sent: true}))
  }

  rollString = () => {
    let total = Number(this.state.roll) + Number(this.props.player.initiative);
    let roll = this.state.roll;
    let init = this.props.player.initiative
    if(roll === "20") {
      return "YOU ROLLED 20 ! EXTRA ASS KICKING";
    } else if(roll === "1") {
      return "YOU ROLLED 1 ! YOU SUCK HARD";
    } else {
      return `${roll} + ${init} = ${total}`;
    }
  }

  bsStyle = () => {
    if(this.state.roll === "20"){
      return "success";
    } else if(this.state.roll === "1") {
      return "danger";
    } else {
      return "info";
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.isWaiting
            ? null
            : (
              <div className="col-xs-12">
                <PageHeader>
                Let&#39;s roll <br /><small>{this.props.player.name}</small>
                </PageHeader>
                <div className="row">
                  <div className="col-xs-8">
                    {this.state.sent &&
                      <Alert 
                        bsStyle={this.bsStyle()}
                      >
                        <strong>Roll sent !</strong> {this.rollString()}
                      </Alert>
                    }
                    <form onSubmit={this.sendRoll}>
                      <FormGroup>
                        <InputGroup>
                          <FormControl
                            type="tel"
                            placeholder="Roll"
                            onChange={this.onChangeRoll.bind(this)}
                            onKeyPress={this.onKeyPress.bind(this)}
                            disabled={this.state.sent}
                          />
                          <InputGroup.Addon>+ {this.props.player.initiative} initiative</InputGroup.Addon>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <Button
                          type="submit"
                          bsSize="lg"
                          bsStyle="primary"
                          onClick={this.sendRoll}
                          disabled={!this.isValidation()}
                          block
                        >
                        <Glyphicon glyph="ok" /> Send
                        </Button>
                        <Button
                          type="submit"
                          bsSize="xs"
                          bsStyle="warning"
                          onClick={(event) => this.sendRoll(event, true)}
                          disabled={this.state.sent}
                          block
                        >
                        <Glyphicon glyph="random" /> Random roll
                        </Button>
                      </FormGroup>
                    </form>
                  </div>
                </div>
              </div>
            )
        }
      </React.Fragment>
    )
  }
}

export default RollInput;