import React from 'react';
import { PageHeader, ListGroup, Alert } from 'react-bootstrap';

const PlayerList = (props) => {
  return (
    <React.Fragment>
      {
        props.isWaiting
          ? (
            <div className="col-xs-12">
              <Alert bsStyle="info">
                Waiting for GM prompt ...
              </Alert>
            </div>

          )
          : (
            <div className="col-xs-12">
              <PageHeader>
                Who are you ?
              </PageHeader>
              <ListGroup>
                {props.render()}
              </ListGroup>
            </div>
          )
      }
    </React.Fragment>
  )
}

export default PlayerList;