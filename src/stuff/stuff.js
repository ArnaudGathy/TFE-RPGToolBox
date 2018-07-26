import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { PlayerBlock } from './playerBlock'
import { Spinner } from '../spinner'
import { BACKEND_URL } from '../constants/server'
const axios = require('axios');

export default class Stuff extends Component {
  state = {
    stuff: null,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    fetch(`${BACKEND_URL}/api/stuff`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ stuff: json });
      });
  }

  sendValue = (value, path) => {
    axios.patch(`${BACKEND_URL}/api/stuff/save`, {
      value,
      path
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <PageHeader>
            Manage stuff
          </PageHeader>
          {this.state.stuff ?
            this.state.stuff.map((player, index) =>
              <div className="col-md-12" key={index}>
                <PlayerBlock player={player} playerIndex={index} send={this.sendValue} />
              </div>
            )
            :
            <Spinner />
          }
        </div>
      </div>
    )
  }
}