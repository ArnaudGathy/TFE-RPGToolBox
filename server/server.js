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


        let plist = [];
        let started = false;

        io.on('connection', (socket) => {
            io.emit('get players', plist);

            socket.on('chat message', (msg) => {
                io.emit('chat message', msg);
            });
            socket.on('send player list', list => {
                if(!started) {
                    plist = list;
                    started = true;
                }
            });
            socket.on('choose player', player => {
                plist = plist.filter(pl => pl.name != player.name);
                if(plist.length == 0) {
                    started = false;
                }
                socket.player = player;
            });
            socket.on('get players', () => {
                io.emit('get players', plist);
            });
            socket.on('get players late', () => {
                if(started) {
                    io.emit('get players', plist);
                }
            });
            socket.on('stop rolls', () => {
                plist = [];
                started = false;
                socket.player = "";
                io.emit('get players', plist);
            });
            socket.on('disconnect', () => {
                if(socket.player !== undefined) {
                    plist.push(socket.player);
                }
                io.emit('get players', plist);
            })
        });
    }
}