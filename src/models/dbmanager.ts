import { MongoClient, Db, Collection } from 'mongodb';
import { PetInfo } from './pet_info';
import { Pet } from './pet';
import { User } from './user';

export class DatabaseManager {
    static url = 'mongodb://mongo';
    static port = 27017;
    static client: MongoClient;
    static db: Db;

    static async connect() {
        console.log('Trying to connect to the database...');
        DatabaseManager.client = await MongoClient.connect(`${DatabaseManager.url}:${DatabaseManager.port}`);
        DatabaseManager.db = DatabaseManager.client.db('petcare-db');
        console.log('Connected to database');
    }

    static async insertPetInfo(petInfo: PetInfo) {
        if (DatabaseManager.db == null) {
            return;
        }
        const petInfoCollection: Collection<any> = DatabaseManager.db.collection('pet_info');
        petInfoCollection.insert(petInfo);
    }

    static async getPetInfo(pet: Pet, beginDate?: Date, endDate?: Date): Promise<PetInfo[]> {
        if (DatabaseManager.db == null) {
            return [];
        }
        const petInfoCollection: Collection<PetInfo> = DatabaseManager.db.collection('pet_info');
        const petInfoArray: PetInfo[] = await petInfoCollection.find({pet: pet, date: { $gt: beginDate, $lt: endDate }}).toArray();
        return petInfoArray.map((petInfo: PetInfo) => new PetInfo(petInfo));
    }

    static async insertUser(user: User) {
        if (DatabaseManager.db == null) {
            return;
        }
        const userCollection: Collection<any> = DatabaseManager.db.collection('user');
        userCollection.update({email: user.email}, user, {upsert: true});
    }

    static async insertPet(pet: Pet, owner: User) {
        if (DatabaseManager.db == null) {
            return;
        }
        const petCollection: Collection<any> = DatabaseManager.db.collection('pet');
        petCollection.insert({...pet, owner: owner});
    }

    static async getPets(owner: User): Promise<Pet[]> {
        if (DatabaseManager.db == null) {
            return [];
        }
        const petCollection: Collection<any> = DatabaseManager.db.collection('pet');
        const petsArray: Pet[] = await petCollection.find({owner: owner}).toArray();
        return petsArray.map((pet: Pet) => new Pet(pet));
    }
}