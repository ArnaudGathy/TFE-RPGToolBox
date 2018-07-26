import { Router } from 'express';
import { assocPath } from 'ramda';
const stuff = require('../saves/stuff');
const fs = require('fs');

export default class StuffRouter {

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.patch('/save', this.save);
  }

  getAll(req, res) {
    res.json(stuff).end()
  }

  save(req, res) {
    const {value, path} = req.body
    const toSave = assocPath(path, value, stuff)
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(toSave), 'utf8', (err) => err && console.log(err))

    res.send(req.body)
  }
}
