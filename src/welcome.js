import React, { Component, Fragment } from 'react';
import { PageHeader } from 'react-bootstrap';

export class Welcome extends Component {

  render() {
    return (
      <Fragment>
        <div className="jumbotron">
          <div className="container">
            <h1>Welcome, adventurer !</h1>
            <p>This is a tool for both Game Masters and Players to assist in role-playing games. <br /> May your journey be safe and the loots plentyful.</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <PageHeader>
              Available tools
            </PageHeader>
            <div className="col-md-3">
              <h2>Initiative</h2>
              <p>This tool will let you setup a fight, add players and ennemies and setup an initiative check. You can also lead the fight and follow combat action turns.</p>
              <p><a className="btn btn-danger" onClick={() => this.props.history.push('/init')} role="button">Setup a fight »</a></p>
            </div>
            <div className="col-md-3">
              <h2>Roll</h2>
              <p>This tool will let you send your dice roll during the initiative check. Just wait for the Game Master instructions and roll those dices.</p>
              <p><a className="btn btn-success" onClick={() => this.props.history.push('/roll')} role="button">Let's roll some dices »</a></p>
            </div>
            <div className="col-md-3">
              <h2>Maps</h2>
              <p>The maps tool will let you draw any map or combat situation to better picture the ongoing action. Includes pretty player images !</p>
              <p><a className="btn btn-info" onClick={() => this.props.history.push('/maps')} role="button">Draw a map »</a></p>
            </div>
            <div className="col-md-3">
              <h2>Messenger</h2>
              <p>This is a simple instant messanger. It's anonymouse so don't be shy. Let's discuss with other players about the game.</p>
              <p><a className="btn btn-warning" onClick={() => this.props.history.push('/messenger')} role="button">Start chatting »</a></p>
            </div>
          </div>

          <hr />

          <footer>
            <p>© Gathy Arnaud - Travail de fin d'études - EPFC - Année académique 2017-2018</p>
          </footer>
        </div>
      </Fragment>
    )
  }
}
