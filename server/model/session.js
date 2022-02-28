import AutoIncrementFactory from 'mongoose-sequence';
import mongoose from 'mongoose';
import path from 'path';
import { names, foreignNames } from './associations.js';

const filename = path.basename(import.meta.url);
export const name = names[filename];
const userName = names['user.js'];
const playerName = names['player.js'];

const AutoIncrement = AutoIncrementFactory(mongoose);
const { Schema } = mongoose;

const schema = new Schema({
  _id: Number,
  time: Number,
  [foreignNames.user_as]: { type: Number, ref: userName },
  [foreignNames.player_as]: { type: Number, ref: playerName },
}, { _id: false });

schema.plugin(AutoIncrement, { id: 'session_id_counter', inc_field: '_id' });

const model = mongoose.model(name, schema);

export default model;
