import { Router, Request, Response, NextFunction } from 'express';
const sheets = require('../sheetsConfig');
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

export default class PlayersRouter {

    constructor() {
        this.router = Router();
        this.router.get('/', this.getAll);
    }

    getAll(req, res, next) {
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
                    player[value.gsx$stat.$t] = value.gsx$value.$t;
                }
                return player;
            });
        });

        Promise.all(promises).then(players => {
            res.json(players);
        });
    }
}