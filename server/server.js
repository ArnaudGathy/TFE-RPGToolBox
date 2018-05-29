import * as http from 'http';
import * as bodyParser from 'body-parser';
import PlayersRouter from './routes/players.router';
import DefaultRouter from './routes/default.router';
import path from 'path';
import SocketIO from 'socket.io';
import express from 'express'


export default class Server {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.socket();
    }

    middleware() {
        this.express.use(express.static(path.join(__dirname, '..', 'build')))
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.express.use('/api/players', new PlayersRouter().router);
        this.express.use('/', new DefaultRouter().router);
        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
        });
    }
    
    start() {
        this.port = process.env.PORT || 3000;
        this.express.set('port', this.port);
        this.server = http.createServer(this.express);
        this.server.listen(this.port, () => console.log(`Node/Express server running on : ${this.port}`));
    }

    sortPlayer(plist) {
        let newPlayerList = plist.slice();
        return newPlayerList.sort((p1, p2) => p2.id - p1.id)
      }

    socket() {
        const io = process.env.PORT ? SocketIO(this.server) : SocketIO.listen(8000);

        let plist = [];
        let started = false;

        io.on('connection', (socket) => {
            io.emit('get players', plist);

            socket.on('chat message', (msg) => {
                io.emit('chat message', msg);
            });
            socket.on('ask status', () => {
                io.emit('send status', started);
            });
            socket.on('send player list', list => {
                if(!started) {
                    plist = this.sortPlayer(list);
                    started = true;
                }
            });
            socket.on('choose player', player => {
                if(plist.length == 0) {
                    started = false;
                }
                socket.player = player;
                socket.player.isSelected = true;
                
                const newPList = plist.filter(pl => pl.id !== socket.player.id)
                socket.player.isSelected = true;
                newPList.push(socket.player)
                plist = this.sortPlayer(newPList)

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
                io.emit('stop rolls', plist);
            });
            socket.on('disconnect', () => {
                if(socket.player !== undefined && socket.player !== ""  && !socket.player.hasRolled) {
                    const newPList = plist.filter(pl => pl.id !== socket.player.id)
                    socket.player.isSelected = false;
                    newPList.push(socket.player)
                    plist = this.sortPlayer(newPList)
                }
                io.emit('get players', plist);
            });
            socket.on('send roll', roll => {
                socket.player.hasRolled = true;
                io.emit('receive roll', socket.player, roll);
            });
        });
    }
}