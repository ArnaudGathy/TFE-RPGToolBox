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