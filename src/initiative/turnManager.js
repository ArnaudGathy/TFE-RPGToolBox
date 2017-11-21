import React, { Component } from 'react';
import { Badge, Well } from 'react-bootstrap';

export class TurnManager extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="row row-spacing">
        <div className="col-lg-2 text-center">
          <h4>Turn <Badge>#{this.props.turnCounter}</Badge></h4>
        </div>
        <div className="col-lg-3 text-center">
          <Well bsSize="small">
            {this.props.playerTurn.name}
          </Well>
        </div>
      </div>
    )
  }
}

export default TurnManager;