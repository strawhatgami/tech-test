import {Schema} from 'mongoose';

const methods = {};
const static_methods = {};

const defineSchema = function(){
  const schema = new Schema({
    username: String,
    password: String,
  });

  Object.assign(schema.methods, methods);
  Object.assign(schema.statics, static_methods);

  return schema;
}

const mongooseSchema = defineSchema();
export default mongooseSchema;

