import * as express from 'express';
import * as routes from './routes/routes';
import { DatabaseManager } from './models/dbmanager';
import * as bodyParser from 'body-parser';

class App {
  public express;

  constructor () {
    this.express = express();
    DatabaseManager.connect();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    this.express.use(bodyParser.json({ limit: '5mb' }));

    this.express.use('/api', routes.router);
  }
}

export default new App().express;