import React from 'react';
import { PageHeader, ListGroup, Alert } from 'react-bootstrap';

const PlayerList = (props) => {
  return (
    <React.Fragment>
      {
        props.isWaiting
          ? (
            <div className="col-xs-12">
              <PageHeader>
                Ready to roll ?
              </PageHeader>
              <Alert bsStyle="info">
                Waiting for GM prompt.
              </Alert>
            </div>

          )
          : props.isFinishedRolling
            ? <div>
                <PageHeader>
                  Waiting
                </PageHeader>
                <Alert bsStyle="info">
                  Let's wait for other players.
                </Alert>
              </div>
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