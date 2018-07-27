import React, { Component } from 'react';
import { Panel, ListGroup, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { ItemBlock } from './itemBlock'
import '../style.css';
import PropTypes from 'prop-types';

export class PlayerBlock extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    playerIndex: PropTypes.number.isRequired,
  }

  state = {
    items: this.props.player.items,
    open: true,
  }


  onClickRemove = () => {
    const index = this.state.items.length - 1

    this.props.delete([this.props.playerIndex, 'items', index])

    const newItems = [...this.state.items]
    newItems.splice(index, 1)
    this.setState({ items: [...newItems] })
  }

  onClickAdd = () => {
    const item = {
      name: "Nouvelle arme",
      durability: {
        "current": "100",
        "total": "100"
      }
    }
    this.props.add([this.props.playerIndex, 'items', this.state.items.length])
    const newItems = [...this.state.items]
    newItems.push(item)
    this.setState({ items: [...newItems] })
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary" id="collapsible-panel-example-1" expanded={this.state.open}>
          <Panel.Heading>
            <strong>{this.props.player.name}</strong>
            <ButtonGroup className="buttonGroupRight">
              <Button
                bsStyle="danger"
                bsSize="xsmall"
                onClick={this.onClickRemove}
              >
                <Glyphicon glyph="minus" />
              </Button>
              <Button
                bsStyle="success"
                bsSize="xsmall"
                onClick={this.onClickAdd}
              >
                <Glyphicon glyph="plus" />
              </Button>
              <Button
                bsStyle="default"
                bsSize="xsmall"
                onClick={() => this.setState({ open: !this.state.open })}
              >
                <Glyphicon glyph={this.state.open ? 'collapse-up' : 'collapse-down'} />
              </Button>
            </ButtonGroup>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <ListGroup>
                {this.state.items.map((item, index) =>
                  <ItemBlock
                    item={item}
                    itemIndex={index}
                    playerIndex={this.props.playerIndex}
                    send={this.props.send}
                    delete={this.props.delete}
                    onClickRemove={this.onClickRemove}
                    key={index} />
                )}
              </ListGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    )
  }
}

export default PlayerBlock;