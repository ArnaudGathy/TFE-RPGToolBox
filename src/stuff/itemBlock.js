import React, { Component } from 'react';
import { ListGroupItem, Form, FormControl, FormGroup, InputGroup, ProgressBar, Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class ItemBlock extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    itemIndex: PropTypes.number.isRequired,
    playerIndex: PropTypes.number.isRequired,
    onClickRemove: PropTypes.func.isRequired,
  }

  state = {
    current: this.props.item.durability.current,
    total: this.props.item.durability.total,
    weaponName: this.props.item.name,
    editMode: false,
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
    return 'info'
  }

  onChangeTotal = (event) => this.setState({ total: event.target.value })

  onChangeCurrent = (event) => this.setState({ current: event.target.value })

  onChangeWeapon = (event) => this.setState({ weaponName: event.target.value })


  onBlurCurrent = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'current'])

  onBlurTotal = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'total'])

  onBlurWeapon = (event) => {
    this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'name'])
    this.setState({ editMode: false })
  }

  onClickWeaponName = () => this.setState({ editMode: true })

  render() {
    const progress = (this.state.current / this.state.total) * 100
    return (
      <ListGroupItem>
        <div className="row">
          <div className="col-md-3">
            {this.state.editMode ?
              <FormControl
                style={{ width: "250px" }}
                type="text"
                value={this.state.weaponName}
                onChange={this.onChangeWeapon}
                onBlur={this.onBlurWeapon}
              />
              :
              <h4 onClick={this.onClickWeaponName}>
                {this.state.weaponName}
              </h4>
            }
          </div>
          <div className="col-md-8">
            <ProgressBar
              style={{
                height: "8px",
                marginBottom: "-4px",
                marginTop: "0px",
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
                    style={{ width: "50px" }}
                    type="text"
                    value={this.state.total}
                    onChange={this.onChangeTotal}
                    onBlur={this.onBlurTotal}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="col-md-1">
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={() => this.props.onClickRemove(this.props.itemIndex)}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </div>
        </div>
      </ListGroupItem>
    )
  }
}

export default ItemBlock;