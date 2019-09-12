import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as createError from 'http-errors';
import { Pet } from '../models/pet';
import { DatabaseManager } from '../models/dbmanager';
import { PetInfo } from '../models/pet_info';
import { User } from '../models/user';

export async function getPetInfo(req: Request, res: Response) {
    const pet: Pet = req.body.pet;
    const owner: User = req.body.owner;
    const beginDate: Date = req.body.beginDate;
    const endDate: Date = req.body.endDate;

    DatabaseManager.getPetInfo(pet, owner, beginDate, endDate).then((petInfo: PetInfo[]) => {
        console.log('Get pet info -> Pet info retrieved succesfully');
        res.status(HttpStatus.OK).json(petInfo);
    }).catch(err => {
        console.log(`Get Pet info -> Couldn't retrieve pet info, error: ${err.message}`);
        res.send(createError(HttpStatus.INTERNAL_SERVER_ERROR, `Couldn't retrieve pet info`));
    });
}