import React, { Component } from 'react';
import { addMessage, sendMessage } from '../socket/api';
import '../messenger/messengerStyle.css';


export class Messenger extends Component {
    state = {
        messageList: []
    };

    componentDidMount() {
        addMessage(this.state.messageList, (list) => this.setState({messageList: list}));
    }

    renderList() {
        let list = this.state.messageList.map((msg) => <li>{msg}</li>);
        return list;
    }

    render() {
        return (
            <div>
                <ul id="messages">
                    {this.renderList()}
                </ul>
                <form onSubmit={(event) => sendMessage(event, this.messageInput)}>
                    <input
                        ref={node => {
                            this.messageInput = node
                        }}
                        type="text" />
                    <button>Send</button>
                </form>
            </div>
        )
    }
}

export default Messenger;