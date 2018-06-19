import { Router } from 'express';

export default class DefaultRouter {

    constructor() {
        this.router = Router();
        this.router.get('/', this.default);
    }

    default(req, res) {
        res.send('<h1>Hello world</h1>');
    }
}
