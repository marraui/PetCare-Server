import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as createError from 'http-errors';
import { Pet } from '../models/pet';
import { DatabaseManager } from '../models/dbmanager';
import { PetInfo } from '../models/pet_info';

export async function getPetInfo(req: Request, res: Response) {
    const pet: Pet = req.body.pet;
    const beginDate: Date = req.body.beginDate;
    const endDate: Date = req.body.endDate;

    const petInfo: PetInfo[] = await DatabaseManager.getPetInfo(pet, beginDate, endDate);
    res.status(HttpStatus.OK).json(petInfo);
}