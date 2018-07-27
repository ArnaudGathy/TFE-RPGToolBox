import { Router } from 'express';
import { assocPath, dissocPath } from 'ramda';
const stuff = require('../saves/stuff');
const fs = require('fs');

export default class StuffRouter {

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.patch('/save', this.save);
    this.router.patch('/item/delete', this.deleteItem);
    this.router.patch('/item/add', this.addItem);
  }

  getAll(req, res) {
    res.json(stuff).end()
  }

  save(req, res) {
    const {value, path} = req.body
    const toSave = assocPath(path, value, stuff)
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(toSave, null, 2), 'utf8', (err) => err && console.log(err))

    res.send(req.body)
  }

  deleteItem(req, res) {
    const {path} = req.body
    const toSave = dissocPath(path, stuff)
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(toSave, null, 2), 'utf8', (err) => err && console.log(err))

    res.send(req.body)
  }

  addItem(req, res) {
    const {path} = req.body
    const item = {
      name: "Nouvelle arme",
      durability: {
        "current": "100",
        "total": "100"
      }
    }
    const toSave = assocPath(path, item, stuff)
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(toSave, null, 2), 'utf8', (err) => err && console.log(err))

    res.send(req.body)
  }
}
