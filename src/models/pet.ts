export class Pet {
    static CAT = 0;
    static DOG = 1;

    name: string;
    typeOfPet: string;

    constructor(pet?: any) {
        this.name = pet && pet.name || '';
        this.typeOfPet = pet && pet.typeOfPet || 1;
    }
}