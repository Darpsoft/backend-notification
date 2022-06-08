import 'http';
import 'https';
import express, {Application} from 'express';
import morgan from 'morgan';

// Routes
import MessagingRouter from './routes/messaging.routes';

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  // eslint-disable-next-line
  storage() {}

  settings(): void {
    this.app.set('port', this.port || process.env.PORT || 8080);
  }

  routes(): void {
    this.app.use('/', [MessagingRouter]);
  }

  middlewares(): void {
    const cors = require('cors');

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  async listen(): Promise<void> {
    await this.app.listen(this.app.get('port'));
    console.info('SERVER ON PORT', this.app.get('port'));
  }
}
