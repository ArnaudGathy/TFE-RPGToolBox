import * as http from 'http';
import * as bodyParser from 'body-parser';
import PlayersRouter from './routes/players.router';
import DefaultRouter from './routes/default.router';
const express = require('express');
const io = require('socket.io')();


export default class Server {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.socket();
    }

    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.express.use('/api/players', new PlayersRouter().router);
        this.express.use('/', new DefaultRouter().router);
    }
    
    start() {
        this.port = process.env.PORT || 3000;
        this.express.set('port', this.port);
        this.server = http.createServer(this.express);
        this.server.listen(this.port, () => console.log(`Node/Express server running on localhost:${this.port}`));
    }

    socket() {
        let port = 8000;
        io.listen(port);
        console.log("Socket.io listening on localhost:" + port);

        io.on('connection', (socket) => {
            socket.on('chat message', (msg) => {
                console.log(msg);
                io.emit('chat message', msg);
            });
        });
    }
}