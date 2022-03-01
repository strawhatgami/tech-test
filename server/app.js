import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import bootstrap from './bootstrap.js';
import authRouter, { ensureConnected } from './routes/auth.js';
import user from './routes/user.js';
import session from './routes/session.js';
import model from './model/index.js';

const app = express();

bootstrap();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);

app.use((req, res, next) => {
  req.model = model;

  next();
});
app.use('/user', ensureConnected, user);
app.use('/session', ensureConnected, session);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`/!\\ HTTP ${err?.status || 500} error:`);
  if (!(err instanceof Error)) {
    console.error('Unloggable error');
  } else if (app.get('env') == 'dev') {
    console.error(err);
  } else {
    console.error(err.toString());
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.sendStatus(err?.status || 500);
});

// Ressource not found
app.use((req, res) => res.sendStatus(404));

export default app;
