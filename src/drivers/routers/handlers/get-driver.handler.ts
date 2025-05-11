import {Request, Response} from "express";
import {db} from "../../../db/in-memorry.db";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {driversRepository} from "../../repositories/drivers.repository";

export function getDriverHandler(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const driver = driversRepository.findById(id);

        if (!driver) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{field: 'id', message: 'Driver not found'}]),
                );
            return;
        }
        res.status(200).send(driver);

}