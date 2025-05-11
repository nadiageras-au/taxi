import { Router } from 'express';;
import { getDriverListHandler } from './handlers/get-driver-list.handler';
import {getDriverHandler} from "./handlers/get-driver.handler";
import {createDriverHandler} from "./handlers/create-driver.handler";
import {updateDriverHandler} from "./handlers/update-driver.handler";
import {deleteDriverHandler} from "./handlers/delete-driver.handler";


export const driversRouter = Router({});

driversRouter
    .get('', getDriverListHandler)
    .get('/:id', getDriverHandler)
    .post('', createDriverHandler)
    .put('/:id', updateDriverHandler)
    .delete('/:id', deleteDriverHandler);