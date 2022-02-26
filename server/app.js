//app & middlewares
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import bootstrap from './bootstrap.js';
import user from './routes/user.js';

var app = express();

bootstrap();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/user', user);

app.use(function(err, req, res, next){
  console.error("/!\\ HTTP " + (err.status || 500) + " error:");
  console.error(err.toString());

  if (app.get('env') != "dev" && err.stack) delete err.stack;
  console.error(JSON.stringify(err));

  res.sendStatus(err.status || 500);
});

// Ressource not found
app.use(function(req, res, next) {
  return res.sendStatus(404);
});

export default app;
