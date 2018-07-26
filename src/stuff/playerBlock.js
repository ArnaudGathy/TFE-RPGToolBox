import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { ItemBlock } from './itemBlock'
import PropTypes from 'prop-types';

export class PlayerBlock extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    playerIndex: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading><strong>{this.props.player.name}</strong></Panel.Heading>
          <ListGroup>
            {this.props.player.items.map((item, index) => <ItemBlock item={item} itemIndex={index} playerIndex={this.props.playerIndex} send={this.props.send} key={index} />)}
          </ListGroup>
        </Panel>
      </div>
    )
  }
}

export default PlayerBlock;