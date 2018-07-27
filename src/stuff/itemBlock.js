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
    defaultAdd: 5,
    customAdd: 0,
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
    return ''
  }

  onChangeTotal = (event) => this.setState({ total: event.target.value })

  onChangeCurrent = (event) => this.setState({ current: event.target.value })

  onChangeWeapon = (event) => this.setState({ weaponName: event.target.value })

  onChangeCustomAdd = (event) => this.setState({customAdd: event.target.value})


  onBlurCurrent = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'current'])

  onBlurTotal = (event) => this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'total'])

  onBlurWeapon = (event) => {
    this.props.send(event.target.value, [this.props.playerIndex, 'items', this.props.itemIndex, 'name'])
    this.setState({ editMode: false })
  }

  onClickWeaponName = () => this.setState({ editMode: true })

  onClickAdd = (event, isCustom = false) => {
    let newCurrent = Number(this.state.current) - (isCustom ? Number(this.state.customAdd) : Number(this.state.defaultAdd))
    if(newCurrent < 0) {
      newCurrent = 0
    }
    this.setState({current: newCurrent})
    this.props.send(newCurrent, [this.props.playerIndex, 'items', this.props.itemIndex, 'durability', 'current'])
  }

  render() {
    const progress = (this.state.current / this.state.total) * 100
    return (
      <ListGroupItem>
        <ProgressBar
          style={{
            height: "30px",
            marginBottom: "-34px",
            width: "250px",
            zIndex: '-1',
          }}
          className="progress-maring"
          now={progress}
          bsStyle={this.getStyle(progress)}
        />
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
              <h4
                onClick={this.onClickWeaponName}
                style={{
                  marginLeft: "10px",
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",

                }}
              >
                {this.state.weaponName}
              </h4>
            }
          </div>
          <div className="col-md-8">
            <Form inline>
              <FormGroup>

                {/* Base durability */}
                <InputGroup style={{ marginRight: "20px" }}>
                  <InputGroup.Addon>
                    {this.state.current}
                  </InputGroup.Addon>
                  <FormControl
                    style={{ width: "50px" }}
                    type="text"
                    value={this.state.total}
                    onChange={this.onChangeTotal}
                    onBlur={this.onBlurTotal}
                  />
                  <InputGroup.Button>
                    <Button bsStyle="danger" onClick={this.onClickAdd}>{`- ${this.state.defaultAdd}`}</Button>
                  </InputGroup.Button>
                </InputGroup>

                {/* Custom durability */}
                <InputGroup>
                  <FormControl
                    style={{ width: "50px" }}
                    type="text"
                    value={this.state.customAdd}
                    onChange={this.onChangeCustomAdd}
                  />
                  <InputGroup.Button>
                    <Button bsStyle="danger" onClick={(e) => this.onClickAdd(e, true)}>{`${this.state.customAdd < 0 ? '+ ' : '- '}${this.state.customAdd < 0 ? Math.abs(this.state.customAdd) : this.state.customAdd}`}</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>

            </Form>
          </div>
        </div>      </ListGroupItem>
    )
  }
}

export default ItemBlock;