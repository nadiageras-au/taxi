import express, { Express, Request, Response } from 'express';
import {driversRouter} from "./drivers/routers/drivers.routers";
import {testingRouter} from "./testing/routers/testing.routers";
import { setupSwagger } from './core/swagger/setup-swagger';
import {DRIVERS_PATH, TESTING_PATH} from "./core/paths/paths";


export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('hello world!!!');
    });

    app.use(DRIVERS_PATH, driversRouter);
    app.use(TESTING_PATH, testingRouter);

    setupSwagger(app);
    return app;
};