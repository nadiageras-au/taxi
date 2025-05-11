import {Request, Response} from "express";
import {db} from "../../../db/in-memorry.db";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {driversRepository} from "../../repositories/drivers.repository";

export function deleteDriverHandler(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    //ищет первый элемент, у которого функция внутри возвращает true и возвращает индекс этого элемента в массиве, если id ни у кого не совпал, то findIndex вернёт -1.
    const index = db.drivers.findIndex((v) => v.id === id);

    if (index === -1) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field: 'id', message: 'Vehicle not found'}]),
            );
        return;
    }

   driversRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
}