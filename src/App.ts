import * as express from 'express';
import * as routes from './routes/routes';
import { DatabaseManager } from './models/dbmanager';
import * as bodyParser from 'body-parser';
import { mqttManager } from './models/mqtt_manager';

class App {
  public express;

  constructor () {
    this.express = express();
    DatabaseManager.connect().then(() => {
      // Initialize Mqtt Manager
      console.log('Initializing mqtt manager');
      mqttManager.connect();
    });
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use(bodyParser.json({ limit: '5mb' }));

    this.express.use('/api', routes.router);
  }
}

export default new App().express;