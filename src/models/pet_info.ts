import { Pet } from './pet';
import { User } from './user';

export class PetInfo {
    pet: Pet;
    owner: User;
    date: Date;

    constructor (petInfo: any) {
        this.pet = petInfo && petInfo.pet || new Pet();
        this.owner = petInfo && petInfo.owner || new User();
        this.date = petInfo && petInfo.date || new Date();
    }
}