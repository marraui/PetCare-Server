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
        DatabaseManager.client = await MongoClient.connect(`${DatabaseManager.url}:${DatabaseManager.port}`, {
            useNewUrlParser: true
        });
        DatabaseManager.db = DatabaseManager.client.db('petcare-db');
        console.log('Connected to database');
    }

    static async insertPetInfo(petInfo: PetInfo) {
        if (DatabaseManager.db == null) {
            return;
        }
        const petInfoCollection: Collection<any> = DatabaseManager.db.collection('pet_info');
        petInfoCollection.insertOne(petInfo);
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
        userCollection.updateOne({email: user.email}, {$set: {email: user.email}}, {upsert: true}).then(() => {
            console.log(`DBManager -> User inserted succesfully`);
        }).catch(err => {
            console.log(`DBManager -> User couldn't be inserted, error: ${err.message}`);
        });
    }

    static async insertPet(pet: Pet, owner: User) {
        if (DatabaseManager.db == null) {
            return;
        }
        const petCollection: Collection<any> = DatabaseManager.db.collection('pet');
        petCollection.insert({...pet, owner: owner}).then(() => {
            console.log(`DBManager -> Pet inserted successfully`);
        }).catch(err => {
            console.log(`DBManager -> Pet couldn't be inserted, error: ${err.message}`);
        });
    }

    static async getPets(owner: User): Promise<Pet[]> {
        if (DatabaseManager.db == null) {
            return [];
        }
        const petCollection: Collection<any> = DatabaseManager.db.collection('pet');
        const petsArray: Pet[] = await petCollection.find({owner: owner}).toArray();
        return petsArray.map((pet: Pet) => new Pet(pet));
    }

    static async getUsers(): Promise <User[]> {
        if (DatabaseManager.db == null) {
            return [];
        }

        const userCollection: Collection<any> = DatabaseManager.db.collection('user');
        const userArray: User[] = await userCollection.find().toArray();
        return userArray.map((user: User) => new User(user));
    }

    static async getUser(email: string): Promise<User> {
        if (DatabaseManager.db == null) {
            return null;
        }

        const userCollection: Collection<any> = DatabaseManager.db.collection('user');
        const user: User = await userCollection.findOne({email: email});
        return user != null ? new User(user) : null;
    }

    static async getPet(owner: User, name: string): Promise<Pet> {
        if (DatabaseManager.db == null) {
            return null;
        }

        const petCollection: Collection<any> = DatabaseManager.db.collection('pet');

        const aux = await petCollection.findOneAndUpdate({
            owner: owner, name: name
        },
        {
            $setOnInsert: {
                owner: owner,
                name: name
            }
        },
        {
            returnOriginal: false,
            upsert: true
        });
        console.log('pet: ');
        console.log(aux);
        const pet: Pet = new Pet(aux.value);
        return pet;
    }
}