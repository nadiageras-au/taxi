import {Request, Response} from "express";
import {db} from "../../../db/in-memorry.db";
import {driversRepository} from "../../repositories/drivers.repository";

export function getDriverListHandler(req: Request, res: Response) {
    res.send(driversRepository.findAll());
}