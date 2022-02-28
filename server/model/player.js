import AutoIncrementFactory from 'mongoose-sequence';
import mongoose from 'mongoose';
import path from 'path';
import { names } from './associations.js';

const filename = path.basename(import.meta.url);
export const name = names[filename];

const AutoIncrement = AutoIncrementFactory(mongoose);
const { Schema } = mongoose;

const schema = new Schema({
  _id: Number,
  name: String,
}, { _id: false });

schema.index({ name: 1 }, { unique: true });
schema.plugin(AutoIncrement, { id: 'player_id_counter', inc_field: '_id' });

const model = mongoose.model(name, schema);

export default model;
