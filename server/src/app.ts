import express from 'express';
import config from 'config';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

export const app = express();
const PORT = config.get<number>('port');

app.use(express.json());
app.use(deserializeUser);

app.listen(PORT, async () => {
  log.info(`Server is running @ port ${PORT}`);

  await connect();
  routes(app);
})