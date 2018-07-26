import { Router } from 'express';
const sheets = require('../constants/sheetsConfig');
const alt = require('../constants/players');
import promise from 'es6-promise';
import 'isomorphic-fetch';
promise.polyfill();

export default class PlayersRouter {

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
  }

  getAll(req, res) {
    if (alt.useJSON) {
      const result = alt.players.map(pl => {
        let player = {};
        for (let value of pl.feed.entry) {
          switch (value.gsx$stat.$t) {
            case "id": player.id = value.gsx$value.$t;
              break;
            case "nom": player.name = value.gsx$value.$t;
              break;
            case "initiative": player.initiative = value.gsx$value.$t;
              break;
            default:
          }
        }
        player.isPlayer = true;
        return player
      })
      return res.json(result)
    }


    const {mode} = sheets
    let urls = [];
    let url = sheets[mode].url.replace(sheets[mode].BookReplace, sheets[mode].book);

    sheets[mode].keylist.map(keys => {
      urls.push(url.replace(sheets[mode].KeyReplace, keys.key));
    })

    let promises = urls.map(url => {
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          let player = {};
          for (let value of json.feed.entry) {
            switch (value.gsx$stat.$t) {
              case "id": player.id = value.gsx$value.$t;
                break;
              case "nom": player.name = value.gsx$value.$t;
                break;
              case "initiative": player.initiative = value.gsx$value.$t;
                break;
              default:
            }
          }
          player.isPlayer = true;
          return player;
        });
    });

    Promise.all(promises).then(players => {
      res.json(players)
    });
  }
}
