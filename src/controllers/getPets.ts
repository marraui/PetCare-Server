import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as createError from 'http-errors';
import { User } from '../models/user';
import { DatabaseManager } from '../models/dbmanager';
import { Pet } from '../models/pet';

export async function getPets(req: Request, res: Response) {
    console.log('Get Pets -> Getting pets');
    const owner: User = req.body.owner;
    DatabaseManager.insertUser(owner).then(() => {
        DatabaseManager.getPets(owner).then((pets: Pet[]) => {
            console.log('Get Pets -> Response:');
            console.log(pets);
            res.status(HttpStatus.OK).json(pets);
        }).catch(err => {
            console.log(`Get pets -> Couldn't get pets from owner, error: ${err.message}`);
            res.send(createError(HttpStatus.INTERNAL_SERVER_ERROR, `Couldn't get pets from owner, err: ${err.message}`));
        });
    }).catch(err => {
        console.log(`Get pets -> Couldn't find nor create user of owner, error: ${err.message}`);
    });
    return;
}