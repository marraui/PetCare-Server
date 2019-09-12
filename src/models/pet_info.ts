import { Pet } from './pet';
import { User } from './user';

export class PetInfo {
    pet: Pet;
    owner: User;
    date: number;
    temperature: number;
    heartBeat: number;

    constructor (petInfo: any) {
        this.pet = petInfo && petInfo.pet || new Pet();
        this.owner = petInfo && petInfo.owner || new User();
        this.date = petInfo && petInfo.date || -1;
        this.temperature = petInfo && petInfo.temperature || null;
        this.heartBeat = petInfo && petInfo.heartBeat || null;
    }
}