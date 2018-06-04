import React, { Component } from 'react';
import { addMessage, sendMessage } from '../socket/api';
import { PageHeader } from 'react-bootstrap';

export class Messenger extends Component {
  state = {
    messageList: []
  };

  componentDidMount() {
    addMessage(this.state.messageList, (list) => this.setState({ messageList: list }));
  }

  renderList() {
    return this.state.messageList.map(msg => <li>{msg}</li>);
  }

  render() {
    return (
      <div className="container">
        <PageHeader>
          Messenger
        </PageHeader>
        <ul id="messages">
          {this.renderList()}
        </ul>
        <form className="form" onSubmit={(event) => sendMessage(event, this.messageInput)}>
          <input
            ref={node => {
              this.messageInput = node
            }}
            type="text" 
            placeholder="Message"
            />
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default Messenger;