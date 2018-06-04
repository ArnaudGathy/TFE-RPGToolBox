import io from 'socket.io-client';
import { BACKEND_URL } from '../constants/server'

const host = window.location.hostname;
const connectionOptions = {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
};
const socket = host === 'localhost' ? io(`http://${host}:8000`) : io(BACKEND_URL, connectionOptions)

export function addMessage(list, cb) {
    socket.on('chat message', (msg) => {
        list.push(msg);
        cb(list);
    });
}

export function sendMessage(event, input) {
    event.preventDefault();
    socket.emit('chat message', input.value);
    input.value = "";

}

export function disconnect() {
    socket.disconnect()    
}
export function connect() {
    socket.connect();
}
export function askStatus(cb) {
    socket.emit('ask status');
    socket.on('send status', (started) => {
        cb(started)
    })
}
export function sendPlayerList(list) {
    socket.emit('send player list', list);
    socket.emit('get players');
}

export function stopRolls() {
    socket.emit('stop rolls');
}

export function choosePlayer(player) {
    socket.emit('choose player', player);
    socket.emit('get players');
}

export function getPlayers(cb) {
    socket.emit('get players late');
    socket.on('get players', (plist) => {
        cb(plist);
    });
}

export function stopRollsClient(cb) {
    socket.on('stop rolls', () => {
        cb();
    })
}

export function sendRoll(roll) {
    socket.emit('send roll', roll)
}

export function receiveRoll(cb) {
    socket.on('receive roll', (player, roll) => {
        cb(player, roll)
    })
}
