import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as createError from 'http-errors';
import { User } from '../models/user';
import { DatabaseManager } from '../models/dbmanager';
import { Pet } from '../models/pet';

export async function getPets(req: Request, res: Response) {
    console.log('Get Pets -> Getting pets');
    const owner: User = req.body.owner;
    await DatabaseManager.insertUser(owner);
    const pets: Pet[] = await DatabaseManager.getPets(owner);
    console.log('Get Pets -> Response:');
    console.log(pets);
    res.status(HttpStatus.OK).json(pets);
}