import { Router } from 'express';
const sheets = require('../sheetsConfig');
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

export default class PlayersRouter {

    constructor() {
        this.router = Router();
        this.router.get('/', this.getAll);
    }

    getAll(req, res) {
        let urls = [];
        let url = sheets.url.replace(sheets.BookReplace, sheets.book);

        sheets.keylist.map(keys => {
            urls.push(url.replace(sheets.KeyReplace, keys.key));
        })

        let promises = urls.map(url => {
            return fetch(url)
            .then(response => response.json())
            .then(json => {
                let player = {};
                for(let value of json.feed.entry) {
                    switch(value.gsx$stat.$t) {
                        case "id": player.id = value.gsx$value.$t;
                        break;
                        case "nom": player.name = value.gsx$value.$t;
                        break;
                        case "initiative": player.initiative = value.gsx$value.$t;
                        break;
                        case "pv": player.maxHP = value.gsx$value.$t;
                        break;
                        case "conStat": player.conStat = value.gsx$value.$t;
                        break;
                        default:
                    }
                }
                return player;
            });
        });

        Promise.all(promises).then(players => {
            res.json(players);
        });
    }
}