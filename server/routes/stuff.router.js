import { Router } from 'express';
import { assocPath, dissocPath } from 'ramda';
const stuff = require('../saves/stuff');
const fs = require('fs');

export default class StuffRouter {

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.patch('/save', this.save);
    this.router.patch('/delete', this.delete);
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

  delete(req, res) {
    const {path} = req.body
    const toSave = dissocPath(path, stuff)
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(toSave), 'utf8', (err) => err && console.log(err))

    res.send(req.body)
  }
}
