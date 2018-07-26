import React, { Component } from 'react';
import { ListGroupItem, Form, FormControl, FormGroup, InputGroup, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class ItemBlock extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    itemIndex: PropTypes.number.isRequired,
    playerIndex: PropTypes.number.isRequired,
  }

  state = {
    current: this.props.item.durability.current,
    total: this.props.item.durability.total
  }

  getStyle = (progress) => {
    if (progress === 100) {
      return 'success'
    }
    if (progress <= 20) {
      return 'danger'
    }
    if (progress <= 40) {
      return 'warning'
    }
    return 'primary'
  }

  onChangeTotal = (event) => this.setState({total: event.target.value}) 

  onChangeCurrent = (event) => this.setState({current: event.target.value}) 

  onBlurCurrent = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'current'])

  onBlurTotal = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'total'])

  render() {
    const progress = (this.state.current / this.state.total) * 100
    return (
      <ListGroupItem>
        <h4>{this.props.item.name}</h4>
        <ProgressBar
          style={{
            height: "8px",
            marginBottom: "-4px",
            marginTop: "10px",
            width: "130px",
          }}
          className="progress-maring"
          now={progress}
          bsStyle={this.getStyle(progress)}
        />
        <Form inline>
          <FormGroup>
            <InputGroup>
              <FormControl
                inline
                style={{ width: "50px" }}
                type="text"
                value={this.state.current}
                onChange={this.onChangeCurrent}
                onBlur={this.onBlurCurrent}
              />
              <InputGroup.Addon>
                /
              </InputGroup.Addon>
              <FormControl
                inline
                style={{ width: "50px" }}
                type="text"
                value={this.state.total}
                onChange={this.onChangeTotal}
                onBlur={this.onBlurTotal}
              />
            </InputGroup>
          </FormGroup>
        </Form>
      </ListGroupItem>
    )
  }
}

export default ItemBlock;