import express, { Express, Request, Response } from 'express';
import { db } from "./db/in-memorry.db";
import { HttpStatus } from './core/types/http-statuses';
import { Driver } from './drivers/types/driver';
import {vehicleInputDtoValidation} from "./validation/vehicleInputDtoValidation";
import {createErrorMessages} from "./core/utils/error.utils";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req: Request, res: Response) => {
        res.status(200).send("Hello world!");
    });

    //all drivers
    app.get("/drivers", (req: Request, res: Response) => {
        res.status(200).send(db.drivers);
    });

    //particular driver
    app.get("/drivers/:id",
        (
        req: Request<{ id: string }, Driver, {}, {}>,
        res: Response<Driver | string>,
        ) => {
            const driver = db.drivers.find((d) => d.id === +req.params.id);
            if (!driver) {
                res.status(404).send("no driver found");
                return;
            }
            res.status(200).send(driver);
        },
    );


    app.post('/drivers', (req: Request, res: Response) => {
        //1) проверяем приходящие данные на валидность
        const error = vehicleInputDtoValidation(req.body);

        if(error.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(error));
            return;
        }

        //2) создаем newDriver
        const newDriver: Driver = {
            id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            vehicleMake: req.body.vehicleMake,
            vehicleModel: req.body.vehicleModel,
            vehicleYear: req.body.vehicleYear,
            vehicleLicensePlate: req.body.vehicleLicensePlate,
            vehicleDescription: req.body.vehicleDescription,
            vehicleFeatures: req.body.vehicleFeatures,
            createdAt: new Date(),
        };

        //3) добавляем newDriver в БД
        db.drivers.push(newDriver);
        res.status(HttpStatus.Created).send(newDriver);
    });

    app.get('/testing', (req: Request, res: Response) => {
        res.status(200).send('testing url');
    });



    app.delete("/testing/all-data", (req, res) => {
        db.drivers = [];
        res.sendStatus(HttpStatus.NoContent);
    });


    return app;
};