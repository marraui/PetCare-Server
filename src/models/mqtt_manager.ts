import * as mqtt from 'mqtt';
import { User } from './user';
import { DatabaseManager } from './dbmanager';
import { PetInfo } from './pet_info';
import { Pet } from './pet';
export class MqttManager {
    static url = 'mqtt://test.mosquitto.org:1883';
    static port = 1883;
    mqttClient: mqtt.MqttClient;
    constructor() {
        // Connecting to mqtt server
        console.log(`MqttManager -> Connecting to mqtt server at: ${MqttManager.url}`);
        this.mqttClient = mqtt.connect(MqttManager.url);
        this.mqttClient.on('connect', this.onConnect.bind(this));
        this.mqttClient.on('message', this.onMessage.bind(this));
        this.mqttClient.on('error', () => console.log('MqttManager -> Error'));
    }

    onConnect() {
        console.log('MqttManager -> Connected succesfully to mqtt server');
        // Subscribe to topic
        DatabaseManager.getUsers().then((users: User[]) => {
            users.forEach((user: User) => {
                // Subscribing to the user's topic
                console.log(`MqttManager -> Subscribing to ${user.email} topic`);
                this.mqttClient.subscribe(user.email, err => {
                    // On error
                    if (err) {
                        console.log(`MqttManager -> Couldn't subscribe to ${user.email}, error: ${err.message}`);
                        return;
                    }
                    console.log(`MqttManager -> Subscribed successfully`);
                });
            });
        }).catch(err => {
            // Error getting users
            console.log(`MqttManager -> Couldn't get users, error: ${err.message}`);
        });
    }

    onMessage(topic: string, message: string) {
        console.log('MqttManager -> Message received');
        console.log(`MqttManager -> Topic: ${topic}`);
        console.log(`MqttManager -> Message: ${message}`);
        // Getting user
        DatabaseManager.getUser(topic).then((owner: User) => {
            owner = new User(owner);
            const messageJSON: any = JSON.parse(message);

            // Getting pet
            DatabaseManager.getPet(owner, messageJSON.name).then((pet: Pet) => {
                // Insert pet info
                const petInfo: PetInfo = new PetInfo({
                    pet: pet,
                    owner: owner,
                    date: new Date(),
                    temperature: messageJSON.temperature,
                    heartBeat: messageJSON.heartBeat
                });
                console.log(`MqttManager -> Inserting pet into database`);
                console.log(petInfo);
                DatabaseManager.insertPetInfo(petInfo);
            }).catch(err => {
                // Error getting pet
                console.log(`MqttManager -> Couldn't get pet, error: ${err.message}`);
            });
        }).catch(err => {
            // Error getting user
            console.log(`MqttManager -> Couldn't get user, error: ${err.message}`);
        });
    }
}