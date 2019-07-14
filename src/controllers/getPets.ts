import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as createError from 'http-errors';
import { User } from '../models/user';
import { DatabaseManager } from '../models/dbmanager';
import { Pet } from '../models/pet';

export async function getPets(req: Request, res: Response) {
    const owner: User = req.body.owner;
    await DatabaseManager.insertUser(owner);
    const pets: Pet[] = await DatabaseManager.getPets(owner);
    res.status(HttpStatus.OK).json(pets);
}