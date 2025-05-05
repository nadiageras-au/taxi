import express, { Express, Request, Response } from 'express';
import {driversRouter} from "./drivers/routers/drivers.routers";
import {testingRouter} from "./testing/routers/testing.routers";
import { setupSwagger } from './core/swagger/setup-swagger';


export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('hello world!!!');
    });

    app.use('/drivers', driversRouter);
    app.use('/testing', testingRouter);

    setupSwagger(app);
    return app;
};