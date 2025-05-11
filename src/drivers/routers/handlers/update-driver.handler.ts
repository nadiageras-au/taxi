import {Request, Response} from "express";
import {db} from "../../../db/in-memorry.db";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {vehicleInputDtoValidation} from "../../validation/vehicleInputDtoValidation";
import {driversRepository} from "../../repositories/drivers.repository";
import {driversRouter} from "../drivers.routers";

export function updateDriverHandler(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const driver = driversRepository.findById(id)

    if (!driver) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field: 'id', message: 'Vehicle not found'}]),
            );
        return;
    }

    const errors = vehicleInputDtoValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
    }

    driversRepository.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
}