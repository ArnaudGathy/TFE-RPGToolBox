import { Router } from 'express';
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
    fs.writeFile("./server/saves/stuff.json", JSON.stringify(req.body), 'utf8', (err) => err && console.log(err))
    res.send(req.body)
  }
}
