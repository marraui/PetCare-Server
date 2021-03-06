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
    const beginDate: number = req.body.beginDate ? req.body.beginDate : null;
    const endDate: number = req.body.endDate ? req.body.endDate : null;
    console.log('Get Pet info -> body: ');
    console.log(req.body);

    DatabaseManager.getPetInfo(pet, owner, beginDate, endDate).then((petInfo: PetInfo[]) => {
        console.log('Get Pet info -> Pet info retrieved succesfully');
        console.log('Get Pet info -> Response: ');
        console.log(petInfo);
        res.status(HttpStatus.OK).json(petInfo);
    }).catch(err => {
        console.log(`Get Pet info -> Couldn't retrieve pet info, error: ${err.message}`);
        res.send(createError(HttpStatus.INTERNAL_SERVER_ERROR, `Couldn't retrieve pet info`));
    });
}