import io from 'socket.io-client';
const host = window.location.hostname;
const socket = io(`http://${host}:8000`);

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