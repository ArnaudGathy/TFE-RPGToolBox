import React, { Component } from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import { ItemBlock } from './itemBlock'
import { dissoc } from 'ramda';
import PropTypes from 'prop-types';

export class PlayerBlock extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    playerIndex: PropTypes.number.isRequired,
  }

  state = {
    items: this.props.player.items
  }


  onClickRemove = (itemIndex) => {
    //this.props.delete([this.props.playerIndex, 'items', index])
    const newItems = [...this.state.items]
    newItems.splice(itemIndex, 1)
    this.setState({items: [...newItems]})
  }

  render() {
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading><strong>{this.props.player.name}</strong></Panel.Heading>
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
        </Panel>
      </div>
    )
  }
}

export default PlayerBlock;