import * as jsonServer from 'json-server';
import * as cors from 'cors';

import * as config from './config';
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';
import { handleRegistration } from './register';

// json-server uses express.js inside
const server: any = jsonServer.create();

const router: any = jsonServer.router(config.JSON_SERVER_DBPATH);
const middlewares: any = jsonServer.defaults();

server.use(middlewares);

// we can use bodyparser from json-server
server.use(jsonServer.bodyParser);

// enable all cors
server.use(cors());

server.post('/login', handleAuthentication);
server.use('/orders', handleAuthorization);
server.get('/users', (req, res, next) => {
  return setTimeout(() => { next(); }, 400); // set delay
});

server.post('/users', handleRegistration);

// use default router
server.use(router);

const port: any = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Json-Server is running on port ${port}`);
});
