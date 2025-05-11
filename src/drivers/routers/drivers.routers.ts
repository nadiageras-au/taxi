import { Router } from 'express';;
import { getDriverListHandler } from './handlers/get-driver-list.handler';
import {getDriverHandler} from "./handlers/get-driver.handler";
import {createDriverHandler} from "./handlers/create-driver.handler";
import {updateDriverHandler} from "./handlers/update-driver.handler";
import {deleteDriverHandler} from "./handlers/delete-driver.handler";
import {driverInputDtoValidation, nameValidation} from "../validation/driver.input-dto.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validation-result.middleware";
import {idValidation} from "../../core/middlewares/validation/params-id.valisation-middleware";


export const driversRouter = Router({});

driversRouter
    .get('', getDriverListHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getDriverHandler)
    .post('',
        driverInputDtoValidation,
        inputValidationResultMiddleware,
        createDriverHandler)
    .put('/:id', idValidation, inputValidationResultMiddleware, updateDriverHandler)
    .delete('/:id', idValidation, inputValidationResultMiddleware, deleteDriverHandler);