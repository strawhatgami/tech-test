import mongoose from 'mongoose';
import userModel, { name as userName } from './user.js';
import sessionModel, { name as sessionName } from './session.js';
import playerModel, { name as playerName } from './player.js';

const {
  DB__HOST, DB_NAME, DB__USER, DB__PASSWORD,
} = process.env;

const model = {
  [userName]: userModel,
  [sessionName]: sessionModel,
  [playerName]: playerModel,
  isDbId: (id) => typeof id == 'number' && !isNaN(id),
};

export const connect = async () => {
  mongoose.set('debug', true);

  const DB_URI = `mongodb://${DB__HOST}`;
  const mongoOpts = {
    dbName: DB_NAME,
    useNewUrlParser: true,
  };
  if (DB__USER) mongoOpts.user = DB__USER;
  if (DB__PASSWORD) mongoOpts.pass = DB__PASSWORD;

  await mongoose.connect(DB_URI, mongoOpts);
};

export default model;
