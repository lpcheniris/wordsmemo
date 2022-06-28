import { Application, Router } from 'express';

import { IndexController } from "./controllers/IndexController";
import { QueryController } from './controllers/QueryController';
import { WordController } from './controllers/WordController';

const _routes: [string, Router][] = [
    ['/', IndexController],
    ['/query', QueryController],
    ['/word', WordController]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};