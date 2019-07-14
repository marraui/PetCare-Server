export class Pet {
    name: string;

    constructor(pet?: any) {
        this.name = pet && pet.name || '';
    }
}