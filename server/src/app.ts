import express from 'express';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';

const app = express();

app.use(express.json());

const PORT = config.get<number>('port');

app.listen(PORT, async () => {
  log.info(`Server is running @ port ${PORT}`);

  await connect();
  routes(app);
})